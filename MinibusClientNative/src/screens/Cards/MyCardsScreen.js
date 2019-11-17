import React from 'react';
import {View, AsyncStorage, StyleSheet} from 'react-native';
//import {Text, Input, Button} from 'react-native-elements';
import { Container, Header, Content, 
    List, ListItem, Card, CardItem, Body, Text, Button, CheckBox} from 'native-base';
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

    multiExport = () => {

    }
    render() {
        const cardList = this.props.runList.map( (run) => 
            <CardCheckable key={run.id}
                run={run}
                multiSelect={this.state.multiSelect} 
                onLongPress={() => this.setState({
                    multiSelect: true
                })}
                onSinglePress={() => this.onPress(run.id)}
            />
        );

        return (
            <Container>
                <Header>
                    <Text>Mes fiches</Text>
                    {this.state.multiSelect &&
                        <Button onPress={() => {this.setState({multiSelect: false})}}>
                            <Text>Cancel</Text>
                        </Button>
                    }
                </Header>
                 <Content padder>
                    <List>{cardList}</List>
                    {this.state.multiSelect &&
                        <Button onPress={this.multiExport}>
                            <Text>Export x cards</Text>
                        </Button>
                    }
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