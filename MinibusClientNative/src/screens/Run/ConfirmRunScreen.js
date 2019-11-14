import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

class ConfirmRunScreen extends React.Component {

    constructor(props) {
        super(props);
        this.options = this.props.navigation.getParam('options', {});
    }
    onClick = () => {
        this.props.navigation.navigate('mainFlow');
    }
    render() {
        return (
            <SafeAreaView 
                forceInset = {{top: 'always'}}
                justifyContent= 'center'
                alignItems= 'center'
            >
                <Text style = {{fontSize: 48}}>Confirm Run</Text>
                <Text>Enfant : {this.options.child}</Text>
                <Text>Type : {this.options.type}</Text>
                <Button 
                    title="Merci"
                    onPress={this.onClick}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRunScreen);