
import React from 'react';
import Youtube, { YouTubeStandaloneIOS } from 'react-native-youtube';

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
  } from 'react-native';

var { height } = Dimensions.get('window');
 
var box_count = 4;
var box_height = height / box_count;


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
    render() {
      return (
       <View>
            
            <View style= {[styles.box, styles.headerView]}>
                <Text style={styles.appNameText}> Vote </Text>
            </View>

            <View style= {[styles.box, styles.videoView1]}>
                
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
        {this.state.containerMounted && (
            <YouTube
         
            // You must have an API Key for the player to load in Android
            apiKey="AIzaSyDprj26R2jpFDkZdthdDmauLdZfCsHoyGE"
            // Un-comment one of videoId / videoIds / playlist.
            // You can also edit these props while Hot-Loading in development mode to see how
            // it affects the loaded native module
            videoId="luto-PtL-Qk"
            // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
            // playlistId="PLF797E961509B4EB5"
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
        </View>
            <View>
                <Button 
                title= 'Go to First Video'
                onPress={() => this.props.navigation.navigate('FirstVideoScreen')}
                />
            </View>

            <View style={[styles.box, styles.videoView2]}>
                <Button 
                title= 'Go to Second Video'
                onPress={() => this.props.navigation.navigate('SecondVideoScreen')}
                />
            </View>
        
        </View>

      )
    }
  }
}

  const styles = StyleSheet.create({
      headerView: {
          textAlignVertical: 'center',
      },
      videoView1: {
          backgroundColor: 'lightgreen',
          
          
      },
      videoView2: {
          textAlignVertical: "bottom",
          backgroundColor: 'lightblue',
          
      },
      appNameText: {
          color: 'black',
          textAlign: 'center',
          justifyContent: 'center',
          fontSize: 30,
      },
      container: {
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
      },
      box: {
          height: box_height,
      },
});