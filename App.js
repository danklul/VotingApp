import React from 'react';
import firebase from 'react-native-firebase';
import HomeScreen from './components/HomeScreen'
import  FirstVideoScreen  from './components/FirstVideoScreen';
import  SecondVideoScreen  from './components/SecondVideoScreen';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
import PhoneAuthTest from './components/PhoneAuthTest'
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

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());
  
    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }
}

const AppNavigator = createStackNavigator({
  PhoneAuthTest: {
    screen: PhoneAuthTest
  },
  HomeScreen: {
    screen: HomeScreen
  },
  FirstVideoScreen: {
    screen: FirstVideoScreen
  },
  SecondVideoScreen: {
    screen: SecondVideoScreen
  },
},
{
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



