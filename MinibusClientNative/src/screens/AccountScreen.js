import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { deleteToken } from '../store/actions/authActions'

class AccountScreen extends React.Component {
    constructor(props) {
        super(props);
    };
    onLogOut = async () => {
        await AsyncStorage.removeItem('token');
        this.props.deleteToken();
        this.props.navigation.navigate('loginFlow');
    }
    render() {
        return (
            <View>
                <Text style = {{fontSize: 48}}>Account Screen</Text>
                <Button 
                    title='Logout'
                    onPress={this.onLogOut}
                />
            </View>
        )
    }
}

const mapStateToProps = ({token}) => ({
    token
  });
  const mapDispatchToProps = (dispatch, props) => ({
    deleteToken: () => dispatch(deleteToken())
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);