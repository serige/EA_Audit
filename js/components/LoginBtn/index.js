// @flow

import React, { Component } from 'react';

import {
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Style from './Styles';
import { images } from '../../common/appImages';

class LoginBtn extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[Style.container, this.props.style]}
        onPress={this.props.onPress}
      >
        <Image source={images.signupBtn} style={Style.image} />
      </TouchableOpacity>
    );
  }
}

LoginBtn.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.number,
};

LoginBtn.defaultProps = {
  onPress: () => {},
  style: null,
};

export default LoginBtn;
