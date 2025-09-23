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

class CheckListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onItemSelect: PropTypes.func.isRequired,
  }
  onActionPress = (yes: boolean) => {
    let yess = false;
    let no = false;
    if (yes) {
      yess = true;
      no = false;
    } else {
      yess = false;
      no = true;
    }

    this.props.onItemSelect(this.props.item.id, yess, no);
  }


  render() {
    const { radioYes, radioNo, key } = this.props.item;
    return (
      <View style={Styles.container}>
        <Text style={Styles.headText}>{key}</Text>
        <View style={Styles.actions}>
          <TouchableOpacity
            onPress={() => this.onActionPress(true)}
          >
            <View style={Styles.actionWrapper}>
              <Image
                source={radioYes ? images.radioSelected : images.radioUnSelected}
                resizeMode="contain"
                style={Styles.actionImage}
              />
              <Text style={Styles.actionLabel}>Pass</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onActionPress(false)}
          >
            <View style={Styles.actionWrapper}>
              <Image
                source={radioNo ? images.radioSelected : images.radioUnSelected}
                resizeMode="contain"
                style={Styles.actionImage}
              />
              <Text style={Styles.actionLabel}>Fail</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CheckListItem;
