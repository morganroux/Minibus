import React from 'react';
import {View, AsyncStorage, StyleSheet} from 'react-native';
//import {Text, Input, Button} from 'react-native-elements';
import { Container, Header, Content, Card, CardItem, Body, Text, Button, CheckBox} from 'native-base';
import CardCheckable from './CardCheckable';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { setRunList } from '../../store/actions/authActions';
import { getRunList } from '../../api/api';

class MyCardsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            multiSelect: false
        }
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

    onPress = (runId) => {
        this.props.navigation.navigate('CardDetails', {runId})
    }

    render() {
        return (
            <Container>
                <Header>
                    <Text>Mes fiches</Text>
                </Header>
                 <Content padder> 
                    {this.props.runList.map( (run) => {
                        return (
                            <CardCheckable
                                run={run}
                                multiSelect={this.state.multiSelect} 
                                onLongPress={() => this.setState({
                                    multiSelect: true
                                })}
                                onSinglePress={() => this.onPress(run.id)}
                                key={run.id}
                            />
                        ) 
                    })}
                    <Button onPress={()=>this.props.navigation.navigate('mainFlow')}>
                        <Text>Home</Text>
                    </Button>
                </Content>
            </Container> 
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