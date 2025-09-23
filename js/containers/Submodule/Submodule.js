// @flow

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Style from './Styles';
import { BasicHeader, AssignmentItem } from '../../components';

class Submodule extends Component {
  _goBack = () => {
    this.props.navigation && this.props.navigation.goBack();
  }

  _onItemPress = (item: {}) => {
    const { title } = item;

    this.props.modules.setActiveSection(item.id);
    this.props.navigation.navigate('ModulePage', { title });
  }

  _getParams = () => {
    const { navigation } = this.props;
    if ((navigation && navigation.state) && navigation.state.params) {
      return navigation.state.params;
    }

    return null;
  }

  render() {
    const data = this.props.modules
      .getModuleSubsections(this.props.modules.activeModule, this.props.modules.activeSubmodule).map((item: {}) => {
        return {
          ...item,
          onPress: this._onItemPress,
        };
      });
    const params = this._getParams();
    return (
      <View style={Style.container}>
        <BasicHeader
          onLeftPress={this._goBack}
          title={params.title || "Facility Audit"}
        />
        <ScrollView style={Style.content}>
          {data.map((item: {}) => {
            return (
              <AssignmentItem
                value={item.percents}
                showProgressBar
                textBlock={Style.textBlock}
                key={`assignment-${JSON.stringify(item)}`}
                showScore={false}
                {...item}
                points={100 + item.points}

              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

Submodule.propTypes = {
  navigation: PropTypes.object,
  modules: PropTypes.object,
};

Submodule.defaultProps = {
  navigation: {
    navigate: () => {},
  },
  modules: {
    getSectionQuestions: () => {},
    checkQuestion: () => {},
    activeModule: null,
    activeSection: null,
    setActiveSection: () => {},
  },
};

export default inject((allStores) => ({
  modules: allStores.modules,
}))(observer(Submodule));
