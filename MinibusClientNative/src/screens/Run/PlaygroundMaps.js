import React from 'react';
import {Platform, StyleSheet } from 'react-native';
import {Text, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class StartRunScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x1: null,
            x2: null,
            location: null,
            errorMessage: null,
        }
    }
    handleLocation = () => {
        setTimeout( async () => {
            this.setState(({location}) => ({
                location: {
                    ...location,
                    coords: {
                        ...location.coords,
                        latitude: location.coords.latitude + 0.001,
                        longitude: location.coords.longitude,
                    }
                }
            }))
            console.log(this.state.location);
            this.handleLocation();
        }, 1000)
    }
    async componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            await this._getLocationAsync();
            this.handleLocation();
        }
    }
    
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
            errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            location,
            x1: {
                longitude:location.coords.longitude,
                latitude: location.coords.latitude + 0.02
            },
            x2: {
                longitude:location.coords.longitude,
                latitude: location.coords.latitude - 0.02
            }
        });
    };

    onClickStop = () => {
        this.props.navigation.navigate('StopRun');
    }
    render() {
        let text = 'Waiting..';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
        }

        return (
            <SafeAreaView 
            forceInset = {{top: 'always'}}
            justifyContent= 'center'
            alignItems= 'center'
            >
                <Text style = {{fontSize: 48}}>Start Run</Text>
                <Button 
                    title="Terminer le Trajet"
                    onPress={this.onClickStop}
                />
                <Button 
                    title="Annuler"
                    onPress={() => this.props.navigation.navigate('mainFlow')}
                />
                { this.state.x1 || this.state.x2 || this.state.coord ? (
                    <MapView 
                        style={styles.map}
                        initialRegion={{
                            latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                    }}>
                        <Marker 
                            draggable
                            coordinate={this.state.x1}
                            onDragEnd={(e) => this.setState({ x1: e.nativeEvent.coordinate })}
                        />
                        <Marker 
                            draggable
                            coordinate={this.state.x2}
                            onDragEnd={(e) => this.setState({ x2: e.nativeEvent.coordinate })}
                        />
                        <Marker
                            coordinate={{
                                longitude: this.state.location.coords.longitude,
                                latitude: this.state.location.coords.latitude
                            }}
                        />
                    </MapView>
                ) : null }
                <Text style={styles.paragraph}>{text}</Text>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(StartRunScreen);
