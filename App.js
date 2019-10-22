import React from 'react';
import HomeScreen from './components/HomeScreen'
import  AddCreditScreen from './components/AddCreditScreen';
import  SecondVideoScreen  from './components/SecondVideoScreen';
import PhoneAuthTest from './components/PhoneAuthTest';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {
  StyleSheet,
  StatusBar,
  View,
  
} from 'react-native';

export default class App extends React.Component {
  render() {
    <StatusBar  
            backgroundColor = "black"  
            barStyle = "dark-content"   
            hidden = {false}    
            translucent = {true}  
        />  
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  AddCreditScreen: {
    screen: AddCreditScreen
  },
  SecondVideoScreen: {
    screen: SecondVideoScreen
  },
  PhoneAuthTest: {
    screen: PhoneAuthTest
  }
},{
    initialRouteName: 'PhoneAuthTest'
  });

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15d4d4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




