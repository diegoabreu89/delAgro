import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import AppWithNavigationState from '../navigation/AppNavigator';
import TermsModal from '../components/modals/TermsModal';
import RegisterModal from '../components/modals/RegisterModal';

import { hideTermsModal, hideRegisterModal } from '../reducers/modals';
import { fetchLot } from '../reducers/lots';

class RootContainer extends Component {
  componentDidUpdate(prevProps) {
    const { lotId, fetchLot } = this.props;
    if (lotId !== prevProps.lotId) {
      fetchLot(lotId);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <TermsModal toggleModal={hideTermsModal} isVisible={this.props.terms} />
        <RegisterModal toggleModal={hideRegisterModal} isVisible={this.props.register} />
        <AppWithNavigationState lotId={this.props.lotId} />
      </View>
    );
  }
}

RootContainer.propTypes = {
  terms: PropTypes.bool.isRequired,
  register: PropTypes.bool.isRequired,
  lotId: PropTypes.number,
};

RootContainer.defaultProps = {
  lotId: null,
};

function mapStateToProps({ modals: { terms, register } }) {
  return { terms, register };
}

export default connect(mapStateToProps, { fetchLot })(RootContainer);
