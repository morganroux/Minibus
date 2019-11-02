import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { deleteToken } from '../store/actions/authActions'
import { SafeAreaView } from 'react-navigation';

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
            <SafeAreaView>
                <Text style = {{fontSize: 48}}>Account Screen</Text>
                <Button 
                    title="Logout"
                    onPress={this.onLogOut}
                />
                <Button 
                    title="Home"
                    onPress={() => this.props.navigation.navigate('Dashboard')}
                />
            </SafeAreaView>
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