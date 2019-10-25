import React from 'react';
import YouTube from 'react-native-youtube';
import firebase from 'react-native-firebase';

import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    PixelRatio,
    Button,
    Image,
    Platform,
    Dimensions,
  } from 'react-native';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {
        isReady: false,
        status: null,
        quality: null,
        error: null,
        isPlaying: false,
        isLooping: false,
        fullscreen: false,
        containerMounted: false,
        containerWidth: null,
        user: null,
        usersRef: null,
        credits: null,
        votesVideo1: null,
        votesVideo2: null,
    };
    this.voteOnVideo1 = this.voteOnVideo1.bind(this);
    this.voteOnVideo2 = this.voteOnVideo2.bind(this);
  }
    componentDidMount() {
      this.setUserCredits()
      this.setVotesVideo1()
      this.setVotesVideo2()
      this.setState({
        isReady: false,
        status: null,
        quality: null,
        error: null,
        isPlaying: false,
        isLooping: false,
        fullscreen: false,
        containerMounted: false,
        containerWidth: null,
        user: null,
        usersRef: null,
        credits: null,
        votesVideo1: null,
        votesVideo2: null,
      });
      
    }
    componentWillMount() {
      this.setUserCredits()
      this.setVotesVideo1()
      this.setVotesVideo2()
    }
    // componentWillUnmount() {
    //    firebase.auth().signOut();
    // }

    onChange(state) {
      this.setState(state)
      this.setVotesVideo1()
      this.setVotesVideo2()
      
    }


    // shouldComponentUpdate(nextProps) {
    //   const differentCredits = this.props.credits !== nextProps.credits;
    //   const differentVotes1 = this.props.votesVideo1 !== nextProps.votesVideo1;
    //   const differentVotes2 = this.props.votesVideo2 !== nextProps.votesVideo2;
    //   return differentCredits || differentVotes1 || differentVotes2;
    // }
      setUserCredits()  {
        var user = firebase.auth().currentUser;
        const usersRef = firebase.firestore().collection('users').doc(user.uid)

        usersRef.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            usersRef.onSnapshot((doc) => {
              this.state.credits = JSON.stringify(doc.get("Credits"))
              console.log(doc.data());
            });
          }
      })
      }

      setVotesVideo1() {
        var video1 = firebase.firestore().collection('videoclips').doc('videoclip1');
      video1.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            video1.onSnapshot((doc) => {
              this.state.votesVideo1 = JSON.stringify(doc.get("votes"))
              console.log(doc.data());
            });
          }
      })
      }
      
      setVotesVideo2() {
        var video2 = firebase.firestore().collection('videoclips').doc('videoclip2');
        video2.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            video2.onSnapshot((doc) => {
              this.state.votesVideo2 = JSON.stringify(doc.get("votes"))
              console.log(doc.data());
            });
          }
      })
      }

    async voteOnVideo1() {
        
        var user = firebase.auth().currentUser;
        const usersRef = firebase.firestore().collection('users').doc(user.uid)
        var video1 = firebase.firestore().collection('videoclips').doc('videoclip1');
      video1.update({
          votes: firebase.firestore.FieldValue.increment(1)
      })
      usersRef.update({
        Credits: firebase.firestore.FieldValue.increment(-1)
    })
    video1.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        video1.onSnapshot((doc) => {
          this.setState({
            votesVideo1: JSON.stringify(doc.get("votes")),
           });
          console.log(doc.data());
        });
      }
  })
   
      }

     async voteOnVideo2() {
        var user = firebase.auth().currentUser;
        const usersRef = firebase.firestore().collection('users').doc(user.uid)
        var video2 = firebase.firestore().collection('videoclips').doc('videoclip2');
       video2.update({
        votes: firebase.firestore.FieldValue.increment(1)
      })
       usersRef.update({
        Credits: firebase.firestore.FieldValue.increment(-1)
    })
    video2.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        video2.onSnapshot((doc) => {
          this.setState({
           votesVideo2: JSON.stringify(doc.get("votes")),
          });
          console.log(doc.data());
        });
      }
    })
    
      }

      signOut = () => {
        firebase.auth().signOut();
        this.props.navigation.navigate('PhoneAuthTest')
      }
    
    render() {

      let dimensions = Dimensions.get("window");
      let imageHeight = Math.round((dimensions.width * 4) / 16);
      let imageWidth = dimensions.width;

      return (
        
   
        // Content view
        <ScrollView
      

        style={styles.scrollViewContainer}
        
        onLayout={({
          nativeEvent: {
            layout: { width },
          },
        }) => {
          if (!this.state.containerMounted)
            this.setState({ containerMounted: true });
          if (this.state.containerWidth !== width)
            this.setState({ containerWidth: width });
        }}>
            <StatusBar  
            backgroundColor = "black"  
            barStyle = "dark-content"      
            translucent = {true}  
        />  
        {/* Header */}
        <View>
             <Image
            style={{ height: imageHeight, width: imageWidth, marginTop: 20, marginBottom: 20}}
            source={require("../images/dizordat.png")}
          />
 
             
        </View>
        
        {this.state.containerMounted && (
        <View style={{}}>
          <YouTube
         
            
            apiKey="AIzaSyDprj26R2jpFDkZdthdDmauLdZfCsHoyGE"
            videoId="eSLe4HuKuK0"
          
            play={this.state.isPlaying}
            loop={this.state.isLooping}
            fullscreen={this.state.fullscreen}
            controls={1}
            style={[
              {
                height: PixelRatio.roundToNearestPixel(
                  this.state.containerWidth / (16 / 9)
                ),
              },
              styles.player,
            ]}
            onError={e => this.setState({ error: e.error })}
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onChangeFullscreen={e =>
              this.setState({ fullscreen: e.isFullscreen })
            }
            onProgress={e =>
              this.setState({
                duration: e.duration,
                currentTime: e.currentTime,
              })
            }
          />
          </View>
        )}
        
        {/* Vote button 1 */}
        <Button
            title='Vote'
           onPress={this.voteOnVideo1}
           color='orange'
        />
       
        <View>
        
        <YouTube
         
         apiKey="AIzaSyDprj26R2jpFDkZdthdDmauLdZfCsHoyGE"
   
         videoId="adzYW5DZoWs"
    
         play={this.state.isPlaying}
         loop={this.state.isLooping}
         fullscreen={this.state.fullscreen}
         controls={1}
         style={[
           {
             height: PixelRatio.roundToNearestPixel(
               this.state.containerWidth / (16 / 9)
             ),
           },
           styles.player,
         ]}
         onError={e => this.setState({ error: e.error })}
         onReady={e => this.setState({ isReady: true })}
         onChangeState={e => this.setState({ status: e.state })}
         onChangeQuality={e => this.setState({ quality: e.quality })}
         onChangeFullscreen={e =>
           this.setState({ fullscreen: e.isFullscreen })
         }
         onProgress={e =>
           this.setState({
             duration: e.duration,
             currentTime: e.currentTime,
           })
         }
       /> 
       <Button
            title='Vote'
            onPress={this.voteOnVideo2}
            color='orange'
        />

        </View>

        <View>
        <Text style={{fontSize:15,color:'orange',marginTop:10, marginLeft:20,textDecorationLine:'underline',marginBottom:5}}
             onPress={() => this.props.navigation.navigate('AddCreditScreen')}>
             Credits left: {this.state.credits}
             </Text>
            <Text style={{fontSize:15,color:'orange',marginTop:10, marginLeft:20,textDecorationLine:'underline',marginBottom:5}}>
                Votes
            </Text>
            <Text style={{color:'orange',marginLeft:20}}>
                Video one: {this.state.votesVideo1} 
            </Text>
            <Text style={{color:'orange',marginLeft:20}}>
                Video two: {this.state.votesVideo2}
            </Text>
            <Button style={{marginTop: 50}}
             title="Sign out"
          color="orange"
          onPress={this.signOut}></Button>
        </View>
        
      </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: 'black',

  },
  appNameText: {
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 5,
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  creditText: {
      color: 'orange',
      justifyContent: 'flex-end',
      textAlign: 'right',
      marginRight: 20,
      marginTop: 5,

  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 5,
    marginRight: 25,
    marginLeft: 25,
    marginTop: 10,
    marginBottom:10,
    
  },
  voteButton: {
      textAlign: 'center',
      justifyContent: 'center',
      color: 'orange',
  },
//   voteText: {
//       color: 'black',
//       textAlign: 'center',
//       justifyContent: 'center',
//       fontSize: 30,
//   },
  
});

