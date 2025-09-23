// @flow

import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';

class SelectItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    value: PropTypes.bool,
  }

  render() {
    const {
      title,
      onPress,
      value,
    } = this.props;
    return (
      <TouchableOpacity
        style={[Styles.container]}
        onPress={() => onPress(this.props)}
      >
        <View style={Styles.infoBlock}>
          <View style={[Styles.textBlock]}>
            <View style={Styles.scoreRow}>
              <Text style={Styles.title}>
                {title}
              </Text>
            </View>
          </View>
          <View style={[Styles.bubble, value && Styles.activeBubble]} />
        </View>
      </TouchableOpacity>
    );
  }
}


SelectItem.defaultProps = {
  title: '',
  onPress: () => {},
  value: false,
};

export default SelectItem;
