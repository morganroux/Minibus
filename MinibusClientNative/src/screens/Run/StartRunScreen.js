import React from 'react';
import {Platform, StyleSheet } from 'react-native';
import {Text, Button, ThemeConsumer} from 'react-native-elements';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class StartRunScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            errorMessage: null,
        }
        this.locationFrom = {
            latitude: null,
            longitude: null
        };
        this.locationTo = {
            latitude: null,
            longitude: null
        };
        this.simul = true;

    }

    simulLocation = () => {
        setTimeout( async () => {
            this.setState(({location}) => ({
                location: {
                    ...location,
                    coords: {
                        ...location.coords,
                        latitude: location.coords.latitude + 0.01,
                        longitude: location.coords.longitude + 0.006,
                    }
                }
            }));
            this.simul ? this.simulLocation() : null;
        }, 1000)
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
            errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
        return location;
    };

    async componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            ({
                coords: {
                    latitude: this.locationFrom.latitude, 
                    longitude:this.locationFrom.longitude
                }
            } = await this._getLocationAsync());
            this.simulLocation();
        }
    }

    onClickStop = async () => {
        
        ({latitude: this.locationTo.latitude, longitude:this.locationTo.longitude} = this.state.location.coords);
        this.simul=false; 
        try{
            this.props.navigation.navigate(
                'SummaryRun', 
                {run: {
                    locations : {
                        locationFrom : this.locationFrom,
                        locationTo: this.locationTo,
                    }
                }}
            );
        }
        catch(error){
            console.log("erreur");
            this.setState({
                errorMessage: "erreur"
            });
        }
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
