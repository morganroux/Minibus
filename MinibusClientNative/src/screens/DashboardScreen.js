import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

class DashboardScreen extends React.Component {
    constructor(props) {
        super(props);
    };
    onClickMesFiches = () => {

    };
    onClickMonCompte = () => {

    };
    render() {
        return (
            <SafeAreaView 
                forceInset = {{top: 'always'}}
                justifyContent= 'center'
                alignItems= 'center'
            >
                <Text style = {{fontSize: 48}}>Dashboard {this.props.userName}</Text>
                <Button
                    title="Mon Compte"
                    onPress={this.onClickMonCompte}
                />
                <Button 
                    title="Mes Fiches"
                    onPress={this.onClickMesFiches}
                />
                <Button 
                    title="Commencer Trajet"
                    onPress={() => this.props.navigation.navigate('runFlow')}
                />
            </SafeAreaView>
        )
    }
};

const mapStateToProps = ({token, userName}) => ({
    token,
    userName
});
const mapDispatchToProps = (dispatch, props) => ({
})
  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);