import React from 'react';


import {
    StyleSheet,
    StatusBar,
    View,
    Text,
    ScrollView,
    Button,
  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';



export default class AddCreditScreen extends React.Component {
 
    render() {
      return (
        <ScrollView style={styles.scrollViewContainer}>
          <StatusBar hidden={true} />
          <Text style={styles.creditText}>Your current credits are: 350</Text>
          <Text style={styles.headerText}>Ask your dad or mom nicely for their phonenumber to add more credits:</Text>
          <TextInput style={styles.textInput}> +46 </TextInput>
          <Button
            title='Send'
          />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: 'black',
  },
  headerText: {
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: 'white',
    color: 'black',
    height: 35,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 5,
  },
  creditText: {
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 30,
    fontSize: 25,

  },
});