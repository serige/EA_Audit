// @flow

import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { colors } from '../../common/appColors';

class Input extends Component {
  static propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    editable: PropTypes.bool,
    onChangeText: PropTypes.func,
    multiline: PropTypes.bool,
    style: PropTypes.number,
    titleStyle: PropTypes.number,
    inputStyle: PropTypes.number,
    secureTextEntry: PropTypes.bool,
    keyboardType: PropTypes.string,
  }
  render() {
    const {
      value,
      label,
      placeholder,
      editable,
      onChangeText,
      multiline,
      style,
      titleStyle,
      inputStyle,
      secureTextEntry,
    } = this.props;
    return (
      <View
        style={[Styles.container, style]}
      >
        {label !== '' &&
          <Text style={[Styles.title, titleStyle]}>
            {label}
          </Text>
        }
        <TextInput
          {...this.props}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          style={[Styles.input, inputStyle]}
          value={value}
          editable={editable}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.assignmentDescription}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}


Input.defaultProps = {
  value: '',
  label: '',
  placeholder: '',
  editable: true,
  onChangeText: () => {},
  multiline: false,
  style: null,
  titleStyle: null,
  inputStyle: null,
  secureTextEntry: false,
  keyboardType: "default",
};

export default Input;
