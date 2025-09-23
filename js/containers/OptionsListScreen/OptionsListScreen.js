// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Style from './Styles';
import { OptionsList, Header } from '../../components';

class OptionsListScreen extends Component {
  _onPress = () => {
    const { navigate } = this.props.navigation;
    navigate && navigate('Checklist', { title: 'Sanitation Checklist' });
  }

  render() {
    const data = [
      {
        id: 1,
        key: 'Strait Sanitation Checklist',
        image: 'mySanitationIcon',
        onPress: this._onPress,
      },
    ];
    return (
      <View style={Style.container}>
        <Header
          backEnabled
          navigation={this.props.navigation}
        />
        <View style={Style.content}>
          <OptionsList
            data={data}
            navigation={this.props.navigation}
          />
        </View>
      </View>
    );
  }
}

OptionsListScreen.propTypes = {
  navigation: PropTypes.object,
};

OptionsListScreen.defaultProps = {
  navigation: {
    navigate: () => {},
  },
};

export default OptionsListScreen;
