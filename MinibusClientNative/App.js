import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AccountScreen from './src/screens/AccountScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import SignInScreen from './src/screens/Auth/SignInScreen';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import StartRunScreen from './src/screens/Run/StartRunScreen';
import StopRunScreen from './src/screens/Run/StopRunScreen';
import SummaryRunScreen from './src/screens/Run/SummaryRunScreen';
import ConfirmRunScreen from './src/screens/Run/ConfirmRunScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';
import Store from './src/store/configureStore'; 

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    SignUp: SignUpScreen,
    SignIn: SignInScreen
  }),
  mainFlow: createBottomTabNavigator({
    Dashboard: DashboardScreen,
    Account: AccountScreen 
  }),
  runFlow: createStackNavigator({
    StartRun: StartRunScreen,
    StopRun: StopRunScreen,
    SummaryRun: SummaryRunScreen,
    ConfirmRun: ConfirmRunScreen
  })
});

const AppContainer = createAppContainer(switchNavigator);

export default App = () => (
  <Provider store={Store}>
    <AppContainer />
  </Provider> 
) 