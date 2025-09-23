// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { colors } from '../../common/appColors';

class AuditScore extends Component {
  static propTypes = {
    title: PropTypes.string,
    points: PropTypes.number,
    onPress: PropTypes.func,
    hideBubble: PropTypes.bool,
  }

  _getText = () => {
    const { points } = this.props;

    if (points >= 96) {
      return 'Excellent';
    } else if (points < 96 && points >= 86) {
      return 'Good';
    } else if (points < 86 && points >= 70) {
      return 'Compliant';
    } else if (points < 70) {
      return 'Fail';
    } else {
      return 'Excellent';
    }
  }

  _getColor = () => {
    const { points } = this.props;

    if (points >= 96) {
      return colors.excellent;
    } else if (points < 96 && points >= 86) {
      return colors.good;
    } else if (points < 86 && points >= 70) {
      return colors.compliant;
    } else if (points < 70) {
      return colors.fail;
    } else {
      return colors.excellent;
    }
  }

  render() {
    const {
      title,
      points,
      onPress,
      hideBubble,
    } = this.props;
    const bubbleText = this._getText();
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
            <Text style={Styles.title}>
              {points} Points
            </Text>

            {!hideBubble &&
              <View style={[Styles.block, colored]}>
                <Text style={Styles.bubbleText}>
                  {bubbleText}
                </Text>
              </View>
            }
          </View>
        </View>
      </View>
    );
  }
}


AuditScore.defaultProps = {
  title: '',
  points: 100,
  onPress: () => {},
  hideBubble: false,
};

export default AuditScore;
