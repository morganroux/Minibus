import React from 'react';
import {View, AsyncStorage, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { setRunList } from '../../store/actions/authActions';
import { getRunList } from '../../api/api'

class MyCardsScreen extends React.Component {
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

const mapStateToProps = ({token, runList, userName}) => ({
    token,
    userName,
    runList,
});
const mapDispatchToProps = (dispatch, props) => ({
    updateToken: (token) => dispatch(updateToken(token)),
    updateUserName: (userName) => dispatch(updateUserName(userName)),
    setRunList: (runList) => dispatch(setRunList(runList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyCardsScreen);