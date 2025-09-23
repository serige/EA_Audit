// @flow

import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import Style from './Styles';
import { BasicHeader, ImageBlock } from '../../components';
import { images } from '../../common/appImages';

export default class MyStats extends Component {
  _goBack = () => {
    this.props.navigation && this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={Style.container}>
        <BasicHeader
          onLeftPress={this._goBack}
          title="My Stats"
        />
        <ScrollView contentContainerStyle={Style.content}>
          <View style={Style.graphBlock}>
            <Text
              style={Style.text}
            >
              Scoring Percentage
            </Text>
            <ImageBlock url={images.percentage} style={Style.percentageImg} />
          </View>
          <View style={Style.graphBlock}>
            <Text
              style={Style.text}
            >
              My Scores over Time
            </Text>
            <ImageBlock url={images.scoresOverTime} />
          </View>
          <View style={Style.graphBlock}>
            <Text
              style={Style.text}
            >
              Bar Chart
            </Text>
            <ImageBlock url={images.failedAudits} />
          </View>
          <View style={Style.graphBlock}>
            <Text
              style={Style.text}
            >
              Heatmap of previous Audits
            </Text>
            <ImageBlock url={images.heatmap} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

MyStats.propTypes = {
  navigation: PropTypes.object,
};

MyStats.defaultProps = {
  navigation: {
    navigate: () => {},
  },
};
