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

class ActionsList extends Component {
  renderRow = (item: Object) => (
    <TouchableOpacity onPress={item.onPress}>
      <View style={Styles.row}>
        <Text style={Styles.rowText}>{item.key}</Text>
        <Image resizeMode="contain" style={Styles.image} source={images[item.image]} />
        {
          item.showBadge &&
          <View style={Styles.counterWrapper}>
            <Text style={Styles.counterText}>
              {item.badgeValue}
            </Text>
          </View>
        }
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

ActionsList.propTypes = {
  data: PropTypes.array,
};

ActionsList.defaultProps = {
  data: [],
};

export default ActionsList;
