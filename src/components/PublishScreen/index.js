import React, { PureComponent } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import NavBarPublish from '../../containers/NavBarPublishContainer';
import styles from './styles';
import FormInput from '../FormInput';
import DropDown from '../DropDown';
import validate from './validations';

class PublishScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      category: null,
      breed: null,
      state: null,
    };
    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }
  onChangeCategory(value, index, data) {
    const category = data.find(item => item.id === value);
    this.setState({ category });
  }

  onChangeBreed(value, index, data) {
    const breed = data.find(item => item.id === value);
    this.setState({ breed });
  }

  onChangeState(value, index, data) {
    const state = data.find(item => item.id === value);
    this.setState({ state });
  }

  onSubmit(values) {
    const {
      category,
      breed,
      state,
    } = this.state;
    const { quantity, price, weight, description } = values;
    const video = this.props.navigation.state.params.video;

    this.props.submitLot({
      category_id: category.id,
      breed_id: breed.id,
      state,
      quantity,
      weight,
      video,
      price,
      description,
    });
  }

  renderInput({
    input,
    multiline,
    label,
    secureTextEntry,
    autoFocus,
    type,
    meta,
    capitalize,
  }) {
    return (<FormInput
      label={label}
      input={input}
      autoFocus={autoFocus}
      secureTextEntry={secureTextEntry}
      autoCapitalize={capitalize}
      type={type}
      meta={meta}
      multiline={multiline}
    />
    );
  }

  render() {
    const { breed, category, state } = this.state;
    const { categories, breeds, states, handleSubmit } = this.props;
    const mapStates = states.map(item => ({ id: item, name: item }));
    const unit = (category && category.unit) || '';
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <NavBarPublish
          navigation={this.props.navigation}
          submitLot={this.onSubmit}
          handleSubmit={handleSubmit}
        />
        <ScrollView>
          <View style={styles.formContainer}>
            <DropDown label={'Categoria:'} selected={category} values={categories} onChange={this.onChangeCategory} />
            <Field
              name='quantity'
              type='number'
              label={'Cantidad:'}
              component={this.renderInput}
            />
            <DropDown label={'Raza:'} selected={breed} values={breeds} onChange={this.onChangeBreed} />
            <Field
              name='weight'
              type='number'
              label={'Peso:'}
              component={this.renderInput}
            />
            <DropDown label={'Departamento:'} selected={state} values={mapStates} onChange={this.onChangeState} />
            <Field
              name='price'
              type='number'
              label={`Precio ${unit}:`}
              component={this.renderInput}
            />
            <Field
              name='description'
              type='text'
              label={'Comentarios:'}
              capitalize={'sentences'}
              component={this.renderInput}
              multiline
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

PublishScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  submitLot: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  breeds: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  states: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'Publish',
  validate,
})(PublishScreen);
