// @flow

import React, { Component } from 'react';

import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';

class ProgressBar extends Component {
  render() {
    const { value } = this.props;
    const activeFlex = value / 100;
    const inactiveFlex = (100 - value) / 100;
    const activeStyle = { flex: activeFlex };
    const inactiveStyle = { flex: inactiveFlex };
    return (
      <View style={Styles.container}>
        <View style={Styles.row}>
          <View style={[Styles.active, activeStyle]} />
          <View style={[inactiveStyle]} />
        </View>
        <Text style={Styles.text}>
          {value}%
        </Text>
      </View>
    );
  }
}

ProgressBar.propTypes = {
  value: PropTypes.number,
};

ProgressBar.defaultProps = {
  value: 0,
};

export default ProgressBar;
