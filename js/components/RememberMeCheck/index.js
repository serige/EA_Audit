// @flow

import React, { Component } from 'react';

import {
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Style from './Styles';
import { images } from '../../common/appImages';

class RememberMeCheck extends Component {
  render() {
    const {
      value, onChange, label, style,
    } = this.props;
    const src = value ? images.rememberMeSelected : images.rememberMeUnselected;
    return (
      <TouchableOpacity
        onPress={onChange}
        style={[Style.container, style]}
      >
        <Image
          source={src}
          style={Style.image}
        />
        <Text style={Style.text}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}

RememberMeCheck.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  style: PropTypes.number,
};

RememberMeCheck.defaultProps = {
  value: false,
  onChange: () => {},
  label: '',
  style: null,
};

export default RememberMeCheck;
