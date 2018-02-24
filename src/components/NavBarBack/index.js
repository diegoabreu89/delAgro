import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default class NavBarBack extends PureComponent {
  render() {
    return (
      <View style={styles.bar} >
        <TouchableHighlight style={{ flex: 1 }} onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.sideButtons}>
            <Icon name={'chevron-left'} size={30} />
          </Text>
        </TouchableHighlight>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Detalles</Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

NavBarBack.propTypes = {
  navigation: PropTypes.shape(),
};

NavBarBack.defaultProps = {
  navigation: {},
};
