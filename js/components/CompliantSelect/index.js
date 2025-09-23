// @flow

import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { images } from '../../common/appImages';
import ProgressBar from '../ProgressBar';
import { colors } from '../../common/appColors';

class CompliantSelect extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func,
    style: PropTypes.number,
    showProgressBar: PropTypes.bool,
    value: PropTypes.number,
    textBlock: PropTypes.number,
    subDescription: PropTypes.string,
    showScore: PropTypes.bool,
    points: PropTypes.number,
    customText: PropTypes.string,
  }


  _getText = () => {
    const { customText } = this.props;
    if (customText !== '') {
      return customText;
    } else {
      return '';
    }
  }

  _getColor = () => {
    const { points, customText } = this.props;

    if (points === 0 && customText === 'Compliant') {
      return colors.compliant;
    } else if (points === 0 && customText === 'N/A') {
      return colors.na;
    } else if (points === -1) {
      return colors.minor;
    } else if (points === -10) {
      return colors.major;
    } else if (points === -50) {
      return colors.critical;
    } else {
      return colors.na;
    }
  }

  _renderScore = () => {
    const colored = { backgroundColor: this._getColor() };
    return (
      <View style={[Styles.block, colored]}>
        <Text style={Styles.bubbleText}>
          {this._getText()}
        </Text>
      </View>
    );
  }

  render() {
    const {
      title,
      description,
      onPress,
      style,
      textBlock,
      showProgressBar,
      value,
      subDescription,
      showScore,
    } = this.props;
    const hasDescription = description !== '' && description !== undefined;
    const hasSubDescription = subDescription !== '' && subDescription !== undefined;
    return (
      <TouchableOpacity
        style={[Styles.container, style]}
        onPress={() => onPress(this.props)}
      >
        <View style={Styles.infoBlock}>
          <View style={[Styles.textBlock, textBlock]}>
            <View style={Styles.scoreRow}>
              <Text style={Styles.title}>
                {title}
              </Text>
              {showScore && this._renderScore()}
            </View>
            {hasDescription &&
              <Text style={Styles.description}>
                {description}
              </Text>
            }
            {hasSubDescription &&
              <Text style={Styles.description}>
                {subDescription}
              </Text>
            }
          </View>
          <View style={Styles.iconWrapper}>
            <Image
              source={images.nextGrey}
              resizeMode="contain"
              style={Styles.icon}
            />
          </View>
        </View>

        {showProgressBar &&
          <View style={Styles.progressBar}>
            <ProgressBar value={value} />
          </View>
        }
      </TouchableOpacity>
    );
  }
}


CompliantSelect.defaultProps = {
  title: '',
  description: '',
  onPress: () => {},
  style: null,
  showProgressBar: false,
  value: 0,
  textBlock: null,
  subDescription: '',
  showScore: false,
  points: 0,
  customText: '',
};

export default CompliantSelect;
