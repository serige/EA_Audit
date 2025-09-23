// @flow

import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';
import Styles from './Styles';
import { images } from '../../common/appImages';

class Header extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.logoWrapper}>
          <Image source={images.logo} resizeMode="contain" style={Styles.logo} />
        </View>
      </View>
    );
  }
}

export default Header;
