// @flow

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Style from './Styles';
import { BasicHeader, AssignmentItem } from '../../components';

class PendingList extends Component {
  _goBack = () => {
    this.props.navigation && this.props.navigation.goBack();
  }

  _onItemPress = (item: {}) => {
    this.props.modules.setActiveCompany(item.id);
    this.props.navigation.navigate('PendingAudit', { ...item, editable: false });
  }

  _getData = () => {
    return this.props.modules.pendingAudits.map((item: {}) => {
      return {
        ...item,
        onPress: this._onItemPress,
      };
    });
  }

  render() {
    const data = this._getData();
    return (
      <View style={Style.container}>
        <BasicHeader
          onLeftPress={this._goBack}
          title="Pending Assignments"
        />
        <ScrollView style={Style.content}>
          {data.map((item: {}) => {
            return (
              <AssignmentItem
                key={`assignment-${JSON.stringify(item)}`}
                {...item}
                subDescription={item.place}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

PendingList.propTypes = {
  navigation: PropTypes.object,
  modules: PropTypes.object,
};

PendingList.defaultProps = {
  navigation: {
    navigate: () => {},
  },
  modules: {
    getSectionQuestions: () => {},
    checkQuestion: () => {},
    activeModule: null,
    activeSection: null,
  },
};

export default inject((allStores) => ({
  modules: allStores.modules,
}))(observer(PendingList));
