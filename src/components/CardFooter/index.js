import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import MainButton from '../MainButton';
import styles from './styles';

export default class CardFooter extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.countText}>103 Vaquillonas</Text>
          <Text style={styles.weightText}>380-400 kg</Text>
          <Text style={styles.priceText}>$1.24/kg</Text>
        </View>
        <View style={styles.buttonContainer}>
          <MainButton title={'DETALLES'} onPress={() => console.log('vamo que vamo')} />
        </View>
      </View>
    );
  }
}
