// @flow

import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import Style from './Styles';
import { BasicHeader, AuditPageItem } from '../../components';

class AuditPage extends Component {
  _goBack = () => {
    this.props.modules.clearStore();
    this.props.navigation && this.props.navigation.goBack();
  }

  _onItemPress = (item: {}) => {
    this.props.modules.setActiveModule(item.id);
    this.props.navigation.navigate('FacilityAudit');
  }

  _submit = () => {
    Alert.alert(
      'Are you sure you’re ready to submit this audit?',
      '',
      [
        { text: 'Yes', onPress: () => this._navigateToHome() },
        { text: 'No', onPress: () => (null) },
      ]
    );
  }

  _navigateToHome() {
    this.props.modules.clearStore();
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const data = this.props.modules.list.map((item: {}) => {
      return {
        ...item,
        onPress: this._onItemPress,
      };
    });
    return (
      <View style={Style.container}>
        <BasicHeader
          onLeftPress={this._goBack}
          onRightPress={this._submit}
          rightLabel="Submit"
          showRight
          title="Modules"
        />
        <ScrollView style={Style.content}>
          {data.map((item: {}) => {
            return (
              <AuditPageItem key={`audit-item-${JSON.stringify(item)}`} {...item} />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

AuditPage.propTypes = {
  navigation: PropTypes.object,
  modules: {
    getSectionQuestions: PropTypes.func,
    checkQuestion: PropTypes.func,
    activeModule: PropTypes.string,
    activeSection: PropTypes.string,
    setActiveSection: PropTypes.func,
  },
};

AuditPage.defaultProps = {
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
}))(observer(AuditPage));
