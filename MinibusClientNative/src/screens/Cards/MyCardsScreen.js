import React from 'react';
import {View, AsyncStorage, StyleSheet} from 'react-native';
import { Container, Header, Content, 
    List, ListItem, Card, CardItem, Body, Text, Button, CheckBox} from 'native-base';
import CardCheckable from './CardCheckable';
import { connect } from 'react-redux';
import { setRunList } from '../../store/actions/authActions';
import { getRunList } from '../../api/api';
import { exportToPdf } from '../../api/api';

class MyCardsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            multiSelect: false,
            checkboxs:[],
        }
    };

    async componentWillMount() {
        try {
            const { runList } = await getRunList(this.props.token);
            this.props.setRunList(runList);
        }
        catch(err) {
            console.log('erreur');
        }
    }

    onPress = (runId) => {
        this.props.navigation.navigate('CardDetails', {runId})
    }

    onCheck = (id) => {
        if (this.state.checkboxs.find( (item) => item === id)) {
            this.setState((prevState) => ({
                checkboxs: prevState.checkboxs.filter((item)=> item !== id)
            }));
        } else {
            this.setState((prevState) => ({
                checkboxs: [...prevState.checkboxs, id]
            })); 
        }
    }

    multiExport = () => {
        const items = [];
        this.state.checkboxs.forEach((checkboxId)=>{
            const newItem = this.props.runList.find((item) => item.id == checkboxId);
            if (newItem) {
                items.push(newItem);
            }
        })
        exportToPdf(this.props.token, items);
    }

    render() {
        const cardList = this.props.runList.map( (run) => 
            <CardCheckable key={run.id}
                run={run}
                checkboxs={this.state.checkboxs}
                multiSelect={this.state.multiSelect} 
                onLongPress={(id) => {
                    (!this.state.multiSelect) && this.setState({
                    multiSelect: true,
                    checkboxs: [id]
                    })
                }}
                onSinglePress={() => this.onPress(run.id)}
                onCheck={this.onCheck}
            />
        );

        return (
            <Container>
                <Header>
                    <Text>Mes fiches</Text>
                    {this.state.multiSelect &&
                        <Button onPress={() => this.setState({multiSelect: false, checkboxs: []})}>
                            <Text>Cancel</Text>
                        </Button>
                    }
                </Header>
                 <Content padder>
                    <List>{cardList}</List>
                    {this.state.multiSelect &&
                        <Button 
                            onPress={this.multiExport}
                            disabled={!this.state.checkboxs.length}>
                            <Text>Export {this.state.checkboxs.length} cards</Text>
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