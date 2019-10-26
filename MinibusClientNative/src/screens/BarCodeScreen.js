import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux';
import {updateToken, updateUserName} from '../store/actions/authActions';
import {signInWithBarCode, checkToken} from '../api/api';


class BarCodeScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentWillMount() {

    const storedToken = await AsyncStorage.getItem('token');
    const {errorMessage, userName} = await checkToken(storedToken);
    if(!errorMessage) {
      this.setState({connected: true})
      this.props.updateToken(storedToken);
      this.props.updateUserName(userName);
      alert(`Hello ${userName}`);
      this.props.navigation.navigate('mainFlow');
    }
    else {
      this.getPermissionsAsync();
    }
  }
  async componentDidMount() {
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };
  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }
  
  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true });
    const {token, errorMessage, userName} = await signInWithBarCode(data);
    if(errorMessage || !token) {
      alert('erreur');
    }
    else {
      alert(`Hello ${userName}`);
      this.props.updateToken(token);
      await AsyncStorage.setItem('token', token);
      this.props.navigation.navigate('mainFlow');
    }
  };

}

BarCodeScreen.navigationOptions = () => {
  return {
      header: null
  }
}

const mapStateToProps = ({token}) => ({
  token
});
const mapDispatchToProps = (dispatch, props) => ({
  updateToken: (token) => dispatch(updateToken(token)),
  updateUserName: (userName) => dispatch(updateUserName(userName)),
  checkToken: (token) => dispatch(checkToken(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(BarCodeScreen);