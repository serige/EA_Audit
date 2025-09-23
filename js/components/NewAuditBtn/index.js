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

class NewAuditBtn extends Component {
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
    const { points, customText } = this.props;
    if (customText !== '') {
      return customText;
    } else if (points >= 96) {
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
              source={images.newAuditBtn}
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


NewAuditBtn.defaultProps = {
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

export default NewAuditBtn;
