
import React from 'react';
import HomeScreen from './components/HomeScreen'
import  FirstVideoScreen  from './components/FirstVideoScreen';
import  SecondVideoScreen  from './components/SecondVideoScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity, 
  PixelRatio,
  Dimensions,
  Platform,
  Button,
  Container,
} from 'react-native';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  FirstVideoScreen: {
    screen: FirstVideoScreen
  },
  SecondVideoScreen: {
    screen: SecondVideoScreen
  }
},{
    initialRouteName: 'HomeScreen'
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


