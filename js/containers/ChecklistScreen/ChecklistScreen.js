// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Style from './Styles';
import mock from '../../config/mock.data';
import { CheckList, Header } from '../../components';

class ChecklistScreen extends Component {
  constructor() {
    super();
    const data = JSON.parse(JSON.stringify(mock));
    this.state = {
      numberOfPages: 4,
      currentPage: 1,
      isLoading: false,
      formData: data,
    };
  }
  _paginate = (nextPage: number) => {
    const { numberOfPages } = this.state;
    if (nextPage <= numberOfPages && nextPage > 0) {
      this.setState({
        currentPage: nextPage,
        isLoading: true,
      });
      setTimeout(() => {
        this.setState({
          isLoading: false,
        });
      }, 1000);
    }
  }
  _onItemSelect = (id: number, radioYes: boolean, radioNo: boolean) => {
    const { formData, currentPage } = this.state;
    let index = null;
    formData[currentPage].forEach((item: Object, i: number) => {
      if (id === item.id) {
        index = i;
      }
    });

    if (index !== null) {
      const local = { ...formData[currentPage][index] };
      local.radioNo = radioNo;
      local.radioYes = radioYes;

      this.setState({
        formData: {
          ...formData,
          [currentPage]: [
            ...formData[currentPage].slice(0, index),
            local,
            ...formData[currentPage].slice(index + 1),
          ],
        },
      });
    }
  }
  render() {
    const { formData, currentPage, isLoading } = this.state;
    const keys = Object.keys(formData);

    return (
      <View style={Style.container}>
        <Header
          homeEnabled
          uploadEnabled
          navigation={this.props.navigation}
        />
        <CheckList
          data={formData[currentPage]}
          ada
          isLoading={isLoading}
          numberOfPages={keys.length}
          currentPage={currentPage}
          onItemSelect={this._onItemSelect}
          paginate={this._paginate}
        />
      </View>
    );
  }
}

ChecklistScreen.propTypes = {
  navigation: PropTypes.object,
};

ChecklistScreen.defaultProps = {
  navigation: {
    navigate: () => {},
  },
};

export default ChecklistScreen;
