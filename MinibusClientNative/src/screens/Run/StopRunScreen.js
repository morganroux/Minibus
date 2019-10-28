import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {View, StyleSheet, Text, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

class StopRunScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                child: 'andy',
                type: 'tests'
            }
        }
        this.coords = this.props.navigation.getParam('coords', {}); 
    }
    onClickValidate = () => {
        this.props.navigation.navigate(
            'SummaryRun', 
            {run: {
                    options: this.state.options,
                    coords : this.coords
            }}
        );
    }
    render() {
        return (
            <SafeAreaView
                forceInset = {{top: 'always'}}
                justifyContent= 'center'
                alignItems= 'center'
            >
                <Text style = {{fontSize: 48}}>Stop Run ?</Text>
                <Text>Quel enfant ?</Text>
                <RNPickerSelect
                    placeholder={{}}
                    onValueChange={(value) => this.setState({
                        ...this.state,
                        options: {
                            ...this.state.options,
                            child: value
                        }
                    })}
                    items={[
                        { label: 'Êric', value: 'eric' },
                        { label: 'Emma', value: 'emma' },
                        { label: 'Adrien', value: 'adrien' },
                    ]}
                />
                <Text>Pourquoi ?</Text>
                <RNPickerSelect
                    placeholder={{}}
                    onValueChange={(value) => this.setState({
                        ...this.state,
                        options: {
                            ...this.state.options,
                            type: value
                        }
                    })}
                    items={[
                        { label: 'École', value: 'école' },
                        { label: 'Sport', value: 'sport' }
                    ]}
                />
                <Button 
                    title="Valider"
                    onPress={this.onClickValidate}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(StopRunScreen);