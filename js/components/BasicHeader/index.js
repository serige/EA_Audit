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

class BasicHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    onLeftPress: PropTypes.func,
    onRightPress: PropTypes.func,
    hideLeft: PropTypes.bool,
    leftLabel: PropTypes.string,
    showRight: PropTypes.bool,
    rightIcon: PropTypes.string,
    rightLabel: PropTypes.string,
    disabledRight: PropTypes.bool,
  }

  render() {
    const {
      title,
      onLeftPress,
      onRightPress,
      showRight,
      hideLeft,
      leftLabel,
      rightIcon,
      rightLabel,
      disabledRight,
    } = this.props;
    const hasIcon = rightIcon !== '' && rightIcon !== undefined;
    const hasLabel = rightLabel !== '' && rightLabel !== undefined;
    const submitBtnStyle = [Styles.rightText, disabledRight ? Styles.disabledRightText : null];
    return (
      <View style={Styles.container}>
        {!hideLeft &&
          <View style={[Styles.absoluteBtn, Styles.leftButton]}>
            <TouchableOpacity onPress={onLeftPress}>
              {!leftLabel && <Image source={images.headerBack} resizeMode="contain" style={Styles.button} />}
              {!!leftLabel &&
                <Text style={submitBtnStyle}>
                  {leftLabel}
                </Text>
              }
            </TouchableOpacity>
          </View>
        }
        <View style={Styles.logoWrapper}>
          <View style={Styles.textLogo}>
            <Text style={Styles.headerText}>{title}</Text>
          </View>
          {images.logoLemon && <Image source={images.logoLemon} resizeMode="contain" style={Styles.logo} />}
        </View>
        {showRight &&
          <View style={[Styles.absoluteBtn, Styles.rightButton]}>
            <TouchableOpacity disabled={disabledRight} onPress={onRightPress}>
              {hasIcon && <Image source={images[rightIcon]} resizeMode="contain" style={Styles.button} />}
              {hasLabel &&
                <Text style={submitBtnStyle}>
                  {rightLabel}
                </Text>
              }
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }
}


BasicHeader.defaultProps = {
  title: '',
  onLeftPress: () => {},
  onRightPress: () => {},
  showRight: false,
  hideLeft: false,
  leftLabel: '',
  rightIcon: '',
  rightLabel: '',
  disabledRight: false,
};

export default BasicHeader;

