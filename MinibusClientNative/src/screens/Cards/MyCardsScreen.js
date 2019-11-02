import React from 'react';
import {View, AsyncStorage, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

class MyCardsScreen extends React.Component {
    constructor(props) {
        super(props);
    };

    onClick = (runId) => {
        this.props.navigation.navigate('CardDetails', {runId})
    }
    render() {
        return (
            <SafeAreaView>
                <Text h3>Mes Fiches</Text>
                {this.props.runList.map( (run) => {
                    return (
                        <Button 
                            key={run.id}
                            title={`${run.child} - ${run.type}`}
                            onPress={() => this.onClick(run.id)}
                        />
                   ) 
                })}
                <Button 
                    title= "Home"
                    onPress={()=>this.props.navigation.navigate('mainFlow')}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({token, runList}) => ({
    token,
    runList
});
const mapDispatchToProps = (dispatch, props) => ({
    updateToken: (token) => dispatch(updateToken(token)),
    updateUserName: (userName) => dispatch(updateUserName(userName))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyCardsScreen);