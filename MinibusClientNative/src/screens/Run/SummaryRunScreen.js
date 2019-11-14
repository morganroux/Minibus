import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { addRun } from '../../api/api';
import { getRoute } from '../../api/api';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCiWmGbQDivCv5G4KpzwYeGwoVXWWL560k';

class SummaryRunScreen extends React.Component {

    constructor(props) {
        super(props);
        this.run = this.props.navigation.getParam('run', {});
        this.route = {};
        this.state = {
            options: {
                child: 'andy',
                type: 'tests'
            },
            origin : this.run.locations.locationFrom,
            dest: this.run.locations.locationTo
        }
    }

    async componentWillMount() {
        // Retrieve new informations from viamichelin
        try {
            this.route = await getRoute(this.state.origin, this.state.dest);
            const {
                summary:{
                    totalDist: totalDist,
                    totalTime: totalTime,
                    consumption: consumption,
                    tollCost:{
                        car: tollCost
                    }
                }
            } = this.route;
            this.setState({
                totalDist,
                totalTime,
                consumption,
                tollCost
            });
        } catch(err) {
        }
    }
    onMarkerChanged = async (origin, dest) => {
        // Retrieve new informations everytime the user move the markers
        try {
            this.route = await getRoute(origin, dest);
            const {
                summary:{
                    totalDist: totalDist,
                    totalTime: totalTime,
                    consumption: consumption,
                    tollCost:{
                        car: tollCost
                    }
                }
            } = this.route;
            this.setState({
                origin,
                dest,
                totalDist,
                totalTime,
                consumption,
                tollCost
            });
        } catch(err) {
            this.setState({
                origin,
                dest,
            })
        }
    }

    storeNewRun = async () => {
        try {
            this.run = {
                locations:{
                    locationFrom: this.state.origin,
                    locationTo: this.state.dest
                },
                route: this.route
            }
            console.log(this.run);
            console.log(this.state.options);
            await addRun(this.props.token, this.run, this.state.options);
        }
        catch(err)
        {

        }
    }
    setInitialRegion = () => (
        {
            longitude: (this.state.origin.longitude + this.state.dest.longitude ) / 2,
            latitude: (this.state.origin.latitude + this.state.dest.latitude ) / 2,
            longitudeDelta: Math.abs(this.state.origin.longitude - this.state.dest.longitude  ) * 2,
            latitudeDelta: Math.abs(this.state.origin.latitude - this.state.dest.latitude ) * 2,
        }
    )
    onClickConfirm = async () => {
        try {
            await this.storeNewRun();
            this.props.navigation.navigate('ConfirmRun', {options: this.state.options})
        }
        catch(err) {

        }
    }
    onClickCancel = () => {
        this.props.navigation.navigate('mainFlow');
    }

    render() {
        const hour = (this.state.totalTime / 3600).toFixed(0);
        const minutes = ((this.state.totalTime / 60) % 60).toFixed(0);
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
                        coordinate={this.state.origin}
                        onDragEnd={({nativeEvent: {coordinate}}) => this.onMarkerChanged(coordinate, this.state.dest)}
                    />
                    <Marker
                        draggable
                        coordinate={this.state.dest}
                        onDragEnd={({nativeEvent: {coordinate}}) => this.onMarkerChanged(this.state.origin, coordinate)}
                    />
                    <MapViewDirections
                        origin={this.state.origin}
                        destination={this.state.dest}
                        apikey={GOOGLE_MAPS_APIKEY}
                    />
                </MapView>
                <Text>
                    Distance : {this.state.totalDist / 1000}km - Temps : {hour}h{minutes}min  - Péage : {this.state.tollCost}€ - Coût carburant : {this.state.consumption}€
                </Text>
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