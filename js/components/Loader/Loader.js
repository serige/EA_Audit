// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Loader extends Component {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
  };

  static defaultProps = {
    color: '#3866df',
    size: 37,
    type: 'Pulse',
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner type={this.props.type} color={this.props.color} size={this.props.size} />
      </View>
    );
  }
}

export default Loader;
