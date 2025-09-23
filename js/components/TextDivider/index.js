// @flow

import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';

class TextDivider extends Component {
  static propTypes = {
    title: PropTypes.string,
    bold: PropTypes.bool,
  }

  render() {
    const {
      title,
      bold,
    } = this.props;
    return (
      <TouchableOpacity
        style={[Styles.container]}
      >
        <Text style={[Styles.title, bold && Styles.boldTitle]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}


TextDivider.defaultProps = {
  title: '',
  bold: false,
};

export default TextDivider;
