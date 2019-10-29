import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { addRun } from '../../api/api';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCiWmGbQDivCv5G4KpzwYeGwoVXWWL560k';

class SummaryRunScreen extends React.Component {

    constructor(props) {
        super(props);
        this.run = this.props.navigation.getParam('run', {});
        ({
            locations:{
                locationFrom: this.origin,
                locationTo: this.dest
            },
            route:{
                summary:{
                    totalDist: this.totalDist,
                    totalTime: this.totalTime,
                    consumption: this.consumption,
                    tollCost:{
                        car: this.tollCost
                    }
                }
            }
        } = this.run);
    }
    storeNewRun = async () => {
        try {
            await addRun(this.props.token, this.run)
        }
        catch(err)
        {

        }
    }
    setInitialRegion = () => (
        {
            longitude: (this.origin.longitude + this.dest.longitude ) / 2,
            latitude: (this.origin.latitude + this.dest.latitude ) / 2,
            longitudeDelta: Math.abs(this.origin.longitude - this.dest.longitude  ) * 2,
            latitudeDelta: Math.abs(this.origin.latitude - this.dest.latitude ) * 2,
        }
    )
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
        const hour = (this.totalTime / 3600).toFixed(0);
        const minutes = ((this.totalTime / 60) % 60).toFixed(0);
        return (
            <SafeAreaView 
                forceInset = {{top: 'always'}}
                justifyContent= 'center'
                alignItems= 'center'
            >
                <Text style = {{fontSize: 48}}>Summary Run</Text>
                <MapView 
                    style={styles.map}
                    initialRegion={this.setInitialRegion()}
                >
                    <Marker
                        draggable
                        coordinate={this.origin}
                    />
                    <Marker
                        draggable
                        coordinate={this.dest}
                    />
                    <MapViewDirections
                        origin={this.origin}
                        destination={this.dest}
                        apikey={GOOGLE_MAPS_APIKEY}
                    />
                </MapView>
                <Text>
                    Distance : {this.totalDist / 1000}km - Temps : {hour}h{minutes}min  - Péage : {this.tollCost}€ - Coût carburant : {this.consumption}€
                </Text>
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