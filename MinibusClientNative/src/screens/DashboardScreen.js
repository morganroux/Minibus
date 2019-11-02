import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { setRunList } from '../store/actions/authActions';
import { getRunList } from '../api/api'

class DashboardScreen extends React.Component {
    constructor(props) {
        super(props);
    };

    async componentWillMount() {
        try {
            const { runList } = await getRunList(this.props.token);
            this.props.setRunList(runList);
        }
        catch(err)
        {
            console.log('erreur');
        }
    }

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
                    onPress={() => this.props.navigation.navigate('Account')}
                />
                <Button 
                    title="Mes Fiches"
                    onPress={() => this.props.navigation.navigate('cardsFlow')}
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
    setRunList: (runList) => dispatch(setRunList(runList))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);