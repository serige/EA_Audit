// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Styles from './Styles';
import { CheckListItem, Loader } from '../';
import { images } from '../../common/appImages';

class CheckList extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.listArea}>
          {
            this.props.isLoading ?
              <Loader /> :
              <FlatList
                data={this.props.data}
                refershing={this.props.isLoading}
                keyExtractor={item => item.id}
                renderItem={
                  ({ item }) => (<CheckListItem
                    onItemSelect={
                      (id, radioYes, radioNo) => this.props.onItemSelect(id, radioYes, radioNo)}
                    item={item}
                  />)}
              />
          }
        </View>
        <View style={Styles.pagination}>
          <TouchableOpacity
            disabled={this.props.currentPage === 1}
            onPress={() => this.props.paginate(this.props.currentPage - 1)}
          >
            <Image source={images.back} resizeMode="contain" style={Styles.pagiButton} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={this.props.currentPage >= this.props.numberOfPages}
            onPress={() => this.props.paginate(this.props.currentPage + 1)}
          >
            <Image source={images.forward} resizeMode="contain" style={Styles.pagiButton} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

CheckList.propTypes = {
  isLoading: PropTypes.bool,
  onItemSelect: PropTypes.func,
  currentPage: PropTypes.number,
  numberOfPages: PropTypes.number,
  paginate: PropTypes.func,
  data: PropTypes.array,
};

CheckList.defaultProps = {
  isLoading: false,
  onItemSelect: () => {},
  currentPage: 1,
  numberOfPages: 1,
  paginate: () => {},
  data: [],
};

export default CheckList;
