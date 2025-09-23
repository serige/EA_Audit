// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';

class ModuleDescription extends Component {
  static propTypes = {
    description: PropTypes.string,
    subpoints: PropTypes.array,
  }

  render() {
    const {
      description,
      subpoints,
    } = this.props;
    return (
      <View
        style={Styles.container}
      >
        <Text style={Styles.headText}>{description}</Text>
        {subpoints.map((item: {}) => {
          return (
            <Text key={`subpoints-${Math.random()}`} style={Styles.headText}>{item}</Text>
          );
        })}
      </View>
    );
  }
}

ModuleDescription.defaultProps = {
  description: '',
  subpoints: [],
};

export default ModuleDescription;
