import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import { addRun } from '../../api/api';

class SummaryRunScreen extends React.Component {

    constructor(props) {
        super(props);
        this.run = this.props.navigation.getParam('run', {});
        console.log(this.run);
    }
    storeNewRun = async () => {
        try {
            await addRun(thid.props.token, this.run)
        }
        catch(err)
        {

        }
    }
    onClickConfirm = async () => {
        try {
            await this.storeNewRun();
            this.props.navigation.navigate('ConfirmRun', {options: this.run.options})
        }
        catch(err) {

        }
    }
    onClickCancel = () => {
        this.props.navigation.navigate('mainFlow');
    }
    render() {
        return (
            <SafeAreaView 
                forceInset = {{top: 'always'}}
                justifyContent= 'center'
                alignItems= 'center'
            >
                <Text style = {{fontSize: 48}}>Summary Run</Text>
                <MapView 
                    style={styles.map}
                    initialRegion={{
                        longitude: this.run.coords.locationFrom.coords.longitude,
                        latitude: this.run.coords.locationFrom.coords.latitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            longitude: this.run.coords.locationFrom.coords.longitude,
                            latitude: this.run.coords.locationFrom.coords.latitude
                        }}
                    />
                    <Marker
                        coordinate={{
                            longitude: this.run.coords.locationTo.coords.longitude,
                            latitude: this.run.coords.locationTo.coords.latitude
                        }}
                    />
                </MapView>
                <Text>Enfant : {this.run.options.child}</Text>
                <Text>Type : {this.run.options.type}</Text>
                <Button 
                    title="Confirmer"
                    onPress={this.onClickConfirm}
                />
                <Button 
                    title="Annuler"
                    onPress={this.onClickCancel}
                />
            </SafeAreaView>
        )
    }
};

const styles = StyleSheet.create({
    map: {
        height: 400,
        width: 400
    },
});

const mapStateToProps = ({token, userName}) => ({
    token,
    userName
});
const mapDispatchToProps = (dispatch, props) => ({
})
  
export default connect(mapStateToProps, mapDispatchToProps)(SummaryRunScreen);