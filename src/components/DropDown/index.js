import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, Picker, View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import styles from './styles';

export default class DropDown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      renderPicker: false,
    };
    this.renderPicker = this.renderPicker.bind(this);
  }

  generateItems(values) {
    return values.reduce((acc, val) =>
      ([...acc, <Picker.Item label={val.name} value={val.id} />]),
    []);
  }

  renderPicker() {
    this.setState({ renderPicker: true });
  }

  render() {
    const { disabled, label, values, onChange, selected } = this.props;
    const { renderPicker } = this.state;
    const items = values.reduce((acc, val) =>
      ([...acc, <Picker.Item label={val.name} value={val.id} />]),
    []);
    return (
      <View style={styles.container}>
        <ModalDropdown
          selectedValue={selected}
          onValueChange={onChange}
          style={styles.textInput}
          options={['1', '2']}
          onSelect={onChange}
        />
      </View>
    );
  }
}

DropDown.propTypes = {
  label: PropTypes.string.isRequired,
  values: PropTypes.shape().isRequired,
  selected: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

DropDown.defaultProps = {
  style: 0,
  icon: '',
  disabled: false,
  selected: null,
};
