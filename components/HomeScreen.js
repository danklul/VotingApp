
import React from 'react';
import YouTube, { YouTubeStandaloneIOS } from 'react-native-youtube';
import firebase from 'react-native-firebase';


import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    PixelRatio,
    Dimensions,
    Platform,
    Button,
    Container,
    WebView,
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
        videoId1: "eSLe4HuKuK0",
        videoId2: "adzYW5DZoWs",

    };
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
        
        {/* Header */}
        <View>
             <Text style={styles.appNameText}>Vote</Text>
        </View>
        <Text style={{color:'white', fontSize:20, justifyContent:'center',textAlign:'center' }}>
            Teaser one</Text>
        {this.state.containerMounted && (
          
     
          <YouTube
         
            
            apiKey="AIzaSyDprj26R2jpFDkZdthdDmauLdZfCsHoyGE"
            videoId = {this.state.videoId1}
          
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
        {/* Vote button text video 1 */}
        
        
        
        {/* Vote button 1 */}
        <Button style={{marginTop:60}} 
            title='Submit vote'
            onPress={() => this.props.navigation.navigate('FirstVideoScreen')}
        />
        

        
        <View>
        <YouTube
         
         apiKey="AIzaSyDprj26R2jpFDkZdthdDmauLdZfCsHoyGE"
   
         videoId = {this.state.videoId2}
    
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
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  voteButton: {
      flex: 1,
      textAlign: 'center',
      justifyContent: 'center',
      color: 'white',
  },
  voteText: {
      color: 'black',
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: 30,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  
});
//        <ScrollView>
         
//         <View style= {[styles.box, styles.headerView]}>
//                 <Text style={styles.appNameText}>Vote</Text>
//         </View>

//         <View style= {[styles.box, styles.videoView1]}>
 
//             onLayout={({
//           nativeEvent: {
//             layout: { width },
//           },
//         }) => {
//           if (!this.state.containerMounted)
//             this.setState({ containerMounted: true });
//           if (this.state.containerWidth !== width)
//             this.setState({ containerWidth: width });
//         }}>
//             {this.state.containerMounted && (
//             <YouTube
         
         
//             apiKey="AIzaSyDprj26R2jpFDkZdthdDmauLdZfCsHoyGE"
           
//             videoId="luto-PtL-Qk"
            
//             play={this.state.isPlaying}
//             loop={this.state.isLooping}
//             fullscreen={this.state.fullscreen}
//             controls={1}
//             style={[
//               {
//                 height: PixelRatio.roundToNearestPixel(
//                   this.state.containerWidth / (16 / 9)
//                 ),
//               },
//               styles.player,
//             ]}
//             onError={e => this.setState({ error: e.error })}
//             onReady={e => this.setState({ isReady: true })}
//             onChangeState={e => this.setState({ status: e.state })}
//             onChangeQuality={e => this.setState({ quality: e.quality })}
//             onChangeFullscreen={e =>
//               this.setState({ fullscreen: e.isFullscreen })
//             }
//             onProgress={e =>
//               this.setState({
//                 duration: e.duration,
//                 currentTime: e.currentTime,
//               })
//             }
//           />
//         )}
//         </View>
//             <View>
//                 <Text>Vote on first Video</Text>
//                 <Button 
//                 title='Submit vote'
//                 onPress={() => this.props.navigation.navigate('FirstVideoScreen')}
//                 />
//         </View>

//         <View style={[styles.box, styles.videoView2]}>
//                 <Text>Vote for this video</Text>
//                 <Button 
//                 title='Submit vote'
//                 onPress={() => this.props.navigation.navigate('SecondVideoScreen')}
//                 />
//         </View>
        
//         </ScrollView>
//       );
//     }
//   }


//   const styles = StyleSheet.create({
//       headerView: {
//           textAlignVertical: 'center',
//       },
//       videoView1: {
//           backgroundColor: 'lightgreen',
          
          
//       },
//       videoView2: {
//           textAlignVertical: "bottom",
//           backgroundColor: 'lightblue',
          
//       },
//       appNameText: {
//           color: 'black',
//           textAlign: 'center',
//           justifyContent: 'center',
//           fontSize: 30,
//       },
//       container: {
//           flex: 1,
//           flexDirection: 'column',
//           backgroundColor: 'white',
//       },
//       box: {
//           height: box_height,
//       },
//       player: {
//         alignSelf: 'stretch',
//         marginVertical: 10,
//       }
// });