// @flow

import React, { Component } from 'react';

import {
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';

class BorderedButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[Styles.container, this.props.style]}
      >
        <Text style={Styles.buttonText}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

BorderedButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.number,
};

BorderedButton.defaultProps = {
  onPress: () => {},
  text: '',
  style: null,
};

export default BorderedButton;
