// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { colors } from '../../common/appColors';

class BubbleRow extends Component {
  static propTypes = {
    title: PropTypes.string,
    points: PropTypes.number,
    onPress: PropTypes.func,
    hideBubble: PropTypes.bool,
    status: PropTypes.string,
  }

  _getColor = () => {
    const { points, status } = this.props;

    if (points === -1) {
      return colors.minor;
    } else if (points === -10) {
      return colors.major;
    } else if (points === -50) {
      return colors.critical;
    } else if (points === 0 && status === 'Compliant') {
      return colors.white;
    } else if (points === 0 && status === 'N/A') {
      return colors.na;
    } else {
      return colors.na;
    }
  }

  render() {
    const {
      title,
      onPress,
      status,
      hideBubble,
    } = this.props;
    const colored = { backgroundColor: this._getColor() };
    return (
      <View
        style={Styles.container}
        onPress={() => onPress(this.props)}
      >
        <View style={Styles.titleWrapper}>
          <Text style={Styles.title}>
            {title}
          </Text>
        </View>

        <View style={Styles.pointsBlock}>
          <View style={Styles.bubbleRow}>
            {!hideBubble &&
              <View style={[Styles.block, colored]}>
                <Text style={Styles.bubbleText}>
                  {status}
                </Text>
              </View>
            }
          </View>
        </View>
      </View>
    );
  }
}


BubbleRow.defaultProps = {
  title: '',
  points: 100,
  onPress: () => {},
  hideBubble: false,
  status: 'N/A',
};

export default BubbleRow;
