import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { connect } from 'react-redux';

class DashboardScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text style = {{fontSize: 48}}>Dashboard {this.props.userName}</Text>
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