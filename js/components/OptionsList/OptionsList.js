// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { images } from '../../common/appImages';

class OptionsList extends Component {
  renderRow = (item: Object) => (
    <TouchableOpacity onPress={item.onPress}>
      <View style={Styles.row}>
        <Text style={Styles.rowText}>{item.key}</Text>
        <Image resizeMode="contain" style={Styles.image} source={images[item.image]} />
      </View>
    </TouchableOpacity>
  );
  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (this.renderRow(item))}
      />
    );
  }
}

OptionsList.propTypes = {
  data: PropTypes.array,
};

OptionsList.defaultProps = {
  data: [],
};

export default OptionsList;
