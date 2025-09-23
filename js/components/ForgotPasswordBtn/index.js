// @flow

import React, { Component } from 'react';

import {
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Style from './Styles';

class ForgotPasswordBtn extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[Style.container, this.props.style]}
        onPress={this.props.onPress}
      >
        <Text
          style={Style.text}
        >
          {this.props.label}
        </Text>
      </TouchableOpacity>
    );
  }
}

ForgotPasswordBtn.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  style: PropTypes.number,
};

ForgotPasswordBtn.defaultProps = {
  onPress: () => {},
  label: '',
  style: null,
};

export default ForgotPasswordBtn;
