// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { images } from '../../common/appImages';
import { colors } from '../../common/appColors';

class SingleCheckBoxItem extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    id: PropTypes.string,
    description: PropTypes.string,
    onItemSelect: PropTypes.func,
    onPress: PropTypes.func,
    subpoints: PropTypes.array,
    disableCheckbox: PropTypes.bool,
    hideId: PropTypes.bool,
    showScore: PropTypes.bool,
    points: PropTypes.number,
    customText: PropTypes.string,
  }

  // shouldComponentUpdate(nextProps: {}) {
  //   return this.props.isActive !== nextProps.isActive;
  // }

  _onActionPress = () => {
    this.props.onItemSelect(this.props.id, !this.props.isActive);
  }

  _onPress = () => {
    this.props.onPress(this.props.id);
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
      isActive,
      id,
      description,
      subpoints,
      disableCheckbox,
      hideId,
      showScore,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        style={Styles.container}
      >
        {!hideId && <Text style={Styles.headText}>{id}</Text>}
        <Text style={Styles.headText}>{description}</Text>
        {subpoints.map((item: {}) => {
          return (
            <Text key={`subpoints-${Math.random()}`} style={Styles.headText}>{item}</Text>
          );
        })}
        <View style={Styles.actions}>
          {showScore && this._renderScore()}
          <TouchableOpacity
            disabled={disableCheckbox}
            onPress={() => this._onActionPress()}
          >
            <View style={Styles.actionWrapper}>
              <Image
                source={isActive ? images.radioSelected : images.radioUnSelected}
                resizeMode="contain"
                style={Styles.actionImage}
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

SingleCheckBoxItem.defaultProps = {
  isActive: false,
  id: '',
  description: '',
  onItemSelect: () => {},
  onPress: () => {},
  subpoints: [],
  disableCheckbox: false,
  hideId: false,
  showScore: false,
  points: 0,
  customText: '',
};

export default SingleCheckBoxItem;
