import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, Dimensions } from 'react-native';

import firebase from 'react-native-firebase';


const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

export default class PhoneAuthTest extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+46',
      confirmResult: null,
    };
  }


  componentDidMount() {
    // this.signOut()
    this.setState ({
      user: null
    })
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getUserData()
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '+46',
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
     if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Sending code ...' });

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, message: '' }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
          
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  }

  renderPhoneNumberInput() {
   const { phoneNumber } = this.state;
   let dimensions = Dimensions.get("window");
   let imageHeight = Math.round((dimensions.width * 3) / 16);
   let imageWidth = dimensions.width;
    return (
      
      <View style={{flex:1, padding: 25, backgroundColor: 'black'}}>
           <Image
            style={{ height: imageHeight, width: imageWidth*0.75, marginTop: 20, marginBottom: 20, marginLeft: 20,
              marginRight: 20, position:'relative'}}
            source={require("../images/dizordat.png")}
          />
        <Text style={{ color:'orange'}}>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15, color:'orange'}}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder={'Phone number ... '}
          value={phoneNumber}
        />
        <Button title="Sign Up" color="orange" onPress={this.signIn} />
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 1, backgroundColor: 'black', color: 'orange' }}>{message}</Text>
    );
  }

 getUserData() {
    var user = firebase.auth().currentUser;
    if (user != null) {

    const usersRef = firebase.firestore().collection('users').doc(user.uid)
    usersRef.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      usersRef.onSnapshot((doc) => {
        // do stuff with the data
        console.log(doc.data());
      });
    } else {
        const documentRef = firebase.firestore().collection('users').doc(user.uid).set({
            PhoneNumber: user.phoneNumber,
            UserID: user.uid,
            Credits: 100,
          })  
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
})
}
 }

                   // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.


  renderVerificationCodeInput() {
    const { codeInput } = this.state;
    let dimensions = Dimensions.get("window");
    let imageHeight = Math.round((dimensions.width * 3) / 16);
    let imageWidth = dimensions.width;

    return (
      <View style={{flex:1, marginTop: 25, padding: 25, backgroundColor: 'black'}}>
           <Image
            style={{ height: imageHeight, width: imageWidth*0.75, marginTop: 20, marginBottom: 20, marginLeft: 20,
            marginRight: 20, position:'relative'}}
            source={require("../images/dizordat.png")}
          />
        <Text style={{color:'orange'}}>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15, color:'orange' }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button title="Confirm Code" color="orange" onPress={this.confirmCode} />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1 }}>

        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}
        
        {user && (
          this.props.navigation.navigate('HomeScreen')
    // <View
    //   style={{
    //     padding: 15,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#77dd77',
    //     flex: 1,
    //   }}
    // >
    //   <Image source={{ uri: successImageUri }} style={{ width: 100, height: 100, marginBottom: 25 }} />
    //   <Text style={{ fontSize: 25 }}>Signed In!</Text>
    //   <Button title="Go to home" color="blue" onPress={() => this.props.navigation.navigate('HomeScreen')} />
    //   <Button title="Sign Out" color="red" onPress={this.signOut} />
    //   </View>
      )} 
      </View>
     );
  }
}
