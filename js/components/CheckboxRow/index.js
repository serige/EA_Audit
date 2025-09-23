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

class CheckboxRow extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    id: PropTypes.string,
    description: PropTypes.string,
    onItemSelect: PropTypes.func,
    onPress: PropTypes.func,
    disableCheckbox: PropTypes.bool,
  }

  shouldComponentUpdate(nextProps: {}) {
    return this.props.isActive !== nextProps.isActive;
  }

  _onActionPress = () => {
    this.props.onItemSelect(!this.props.isActive);
  }

  _onPress = () => {
    this.props.onPress(this.props.id);
  }

  render() {
    const {
      isActive,
      description,
      disableCheckbox,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        style={Styles.container}
      >
        <View style={Styles.titleWrapper}>
          <Text style={Styles.headText}>{description}</Text>
        </View>
        <View style={Styles.checkboxWrapper}>
          <TouchableOpacity
            disabled={disableCheckbox}
            onPress={() => this._onActionPress()}
          >
            <Image
              source={isActive ? images.correctiveTrue : images.correctiveFalse}
              resizeMode="contain"
              style={Styles.actionImage}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

CheckboxRow.defaultProps = {
  isActive: false,
  id: '',
  description: '',
  onItemSelect: () => {},
  onPress: () => {},
  disableCheckbox: false,
};

export default CheckboxRow;
