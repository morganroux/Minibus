import React from 'react';
import {View, AsyncStorage, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

class CardDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.runId = this.props.navigation.getParam('runId', {});
    };

    render() {
        return (
            <SafeAreaView>
                <Text h3>Details</Text>
                <Text>{this.runId}</Text>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({token, runList}) => ({
    token,
    runList
});

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsScreen);