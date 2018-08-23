import React, { Component } from 'react';
import Video from 'react-native-video';
import { VideoPlayer as VPlayer, Trimmer } from 'react-native-video-processing';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import ElevatedView from 'react-native-elevated-view'
import Icon from 'react-native-vector-icons/FontAwesome';
import vendido from '../../assets/images/vendido.png';

import styles from './styles';
import { colors } from '../../styles';


export default class VideoPlayer extends Component {
  currentTime = 0;
  constructor(props) {
    super(props);
    this.state = {
      paused: this.props.paused,
      active: false,
    };

    this.onPress = this.onPress.bind(this);
  }

  componentWillReceiveProps() {
    const { id, visibleItems } = this.props;
    if (!this.state.paused && !visibleItems.includes(id)) {
      this.setState({ paused: true, active: false });
    }
  }

  onPress() {
    this.setState({ paused: !this.state.paused, active: !this.state.active });
  }

  render() {
    const { paused, active } = this.state;
    const { uri, thumbnail, noThumbnail, trimVideo, status } = this.props;
    return (
      <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={this.onPress}>
        <ActivityIndicator size="large" style={styles.spinner} color={colors.lightGreen} />
        {status && status === 'sold' && <ElevatedView elevation={1} style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: colors.transparent }}>
          <Image source={vendido} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
        </ElevatedView>}
        {active || noThumbnail ?
          <View style={styles.backgroundVideo}>
            {/* trimVideo && 
            <View style={{flex:0.2}} >
              <Trimmer
                source={uri}
                onTrackerMove={(e) => console.log(e.currentTime)} // iOS only
                currentTime={this.currentTime} // use this prop to set tracker position iOS only
                themeColor={'white'} // iOS only
                thumbWidth={30} // iOS only
                trackerColor={'green'} // iOS only
                onChange={(e) => console.log(e.startTime, e.endTime)}
              />
            </View> */}
            {/* <TouchableOpacity style={{ flex:1 }} onPress={this.onPress}> */}
            <Video
              source={{ uri }}
              resizeMode='cover'
              repeat
              muted
              paused={paused}
              style={{flex:1}}
              onProgress={({ currentTime }) => { this.currentTime = currentTime; }}
            />
            {/* </TouchableOpacity> */}
          </View> :
          <Image style={styles.backgroundVideo} source={{ uri: thumbnail }} />
        }
        <View style={styles.iconContainer}>
          { paused ?
            <Icon name='play' size={22} style={styles.icon} /> :
            <Icon name='pause' size={22} style={styles.icon} />
          }
        </View>
      </TouchableOpacity>
    );
  }
}

VideoPlayer.propTypes = {
  id: PropTypes.number,
  uri: PropTypes.string.isRequired,
  paused: PropTypes.bool,
  visibleItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  thumbnail: PropTypes.string,
  noThumbnail: PropTypes.bool,
  trimVideo: PropTypes.bool,
};

VideoPlayer.defaultProps = {
  id: null,
  paused: true,
  thumbnail: '',
  noThumbnail: false,
  trimVideo: false,
};
