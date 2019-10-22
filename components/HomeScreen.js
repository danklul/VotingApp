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
  } from 'react-native';


export default class HomeScreen extends React.Component {
    state = {
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
    };
    componentDidMount() {
      this.setState({
      });
      this.setUserCredits()
    }
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
    
    render() {
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
             <Text style={styles.creditText}
             onPress={() => this.props.navigation.navigate('AddCreditScreen')}>Credits: {this.state.credits} DOLLARS
                
             </Text>
             
             <Text style={styles.appNameText}>Vote</Text>
             
        </View>
        
        {this.state.containerMounted && (
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
        )}
        
        {/* Vote button 1 */}
        <Button style={{}} 
            title='Submit vote'
            // onPress={() => this.props.navigation.navigate('FirstVideoScreen')}
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
       <Button style={{}} 
            title='Submit vote'
            onPress={() => this.props.navigation.navigate('SecondVideoScreen')}
        />

        </View>

        <View>
            <Text style={{fontSize:15,color:'white',marginTop:10, marginLeft:20,textDecorationLine:'underline',marginBottom:5}}>
                Votes
            </Text>
            <Text style={{color:'white',marginLeft:20}}>
                Video one: 4
            </Text>
            <Text style={{color:'white',marginLeft:20}}>
                Video two: 6
            </Text>
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
      color: 'white',
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
      color: 'white',
  },
//   voteText: {
//       color: 'black',
//       textAlign: 'center',
//       justifyContent: 'center',
//       fontSize: 30,
//   },
  
});

