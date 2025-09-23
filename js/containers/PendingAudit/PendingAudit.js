// @flow

import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Style from './Styles';
import { BasicHeader, BorderedButton } from '../../components';

class PendingAudit extends Component {
  _goBack = () => {
    this.props.navigation && this.props.navigation.goBack();
  }

  _onItemPress = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
    // const params = this._getParams();
    // this.props.navigation.navigate('NewAudit', { ...params, editable: false });
  }

  _getParams = () => {
    const { navigation } = this.props;
    if ((navigation && navigation.state) && navigation.state.params) {
      return navigation.state.params;
    }

    return null;
  }

  render() {
    const params = this._getParams();
    const modules = this.props.modules.getAuditModules(params.id);
    return (
      <View style={Style.container}>
        <BasicHeader
          onLeftPress={this._goBack}
          title="Pending Audit"
        />
        <ScrollView style={Style.content}>
          <Text style={Style.title}>
            {params.title}
          </Text>

          <Text style={Style.date}>
            Start Date: {params.startDate}
          </Text>
          <Text style={Style.date}>
            Audit Due: {params.auditDue}
          </Text>

          <Text style={Style.title}>
            {params.fullDescription}
          </Text>

          <View style={Style.modulesList}>
            <Text style={Style.moduleTitle}>
              Audit Modules:
            </Text>

            {
              modules.map((item: {}) => {
                return (
                  <Text key={`module-${item.id}`} style={Style.moduleTitle}>
                    {item.title}
                  </Text>
                );
              })
            }
          </View>
          <View style={Style.buttonRow}>
            <BorderedButton
              text="Accept"
              onPress={this._onItemPress}
            />
            <BorderedButton
              text="Decline"
              onPress={this._onItemPress}
            />
          </View>

        </ScrollView>
      </View>
    );
  }
}

PendingAudit.propTypes = {
  navigation: PropTypes.object,
  modules: PropTypes.object,
};

PendingAudit.defaultProps = {
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
}))(observer(PendingAudit));
