import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { RNCamera } from 'react-native-camera';
import MainButton from '../MainButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});


export default class CameraScreen extends PureComponent {
  constructor() {
    super();
    this.takePicture = this.takePicture.bind(this);
  }
  takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      this.camera.takePictureAsync(options)
        .then(data => console.log(data));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={this.takePicture}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
          <MainButton onPress={() => this.props.navigation.goBack()} title={'back'} />
        </View>
      </View>
    );
  }
}

CameraScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};
