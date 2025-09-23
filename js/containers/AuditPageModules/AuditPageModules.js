// @flow

import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import Style from './Styles';
import { BasicHeader, AuditPageItem, AuditScore } from '../../components';

class AuditPageModules extends Component {
  _goBack = () => {
    this.props.navigation && this.props.navigation.popToTop();
  }

  _goToOpeningMeeting = () => {
    const {
      activeCompany, audits,
    } = this.props.modules;
    this.props.navigation.navigate('OpeningMeeting', {
      ...(audits[activeCompany].openingMeeting || {}),
    });
  }

  _goToClosingMeeting = () => {
    const {
      activeCompany, audits,
    } = this.props.modules;
    this.props.navigation.navigate('ClosingMeeting', {
      ...(audits[activeCompany].closingMeeting || {}),
    });
  }

  _onItemPress = (item: {}) => {
    this.props.modules.setActiveModule(item.id);
    const params = {};
    if (item.showTitle) {
      params.title = item.title;
    }
    this.props.navigation.navigate('FacilityAudit', params);
  }

  _submit = () => {
    Alert.alert(
      'Audit saved',
      '',
      [
        { text: 'OK', onPress: () => this._navigateToHome() },
      ]
    );
  }

  _navigateToHome() {
    this.props.modules.clearStore();
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'InProgressList' })],
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
          rightLabel="Save"
          showRight
          // disabledRight={!this.props.modules.mandatorySubmitted}
          title="Modules"
        />
        <ScrollView style={Style.content}>
          <AuditScore
            title="Current Score"
            points={this.props.modules.totalScore}
          />
          <AuditPageItem
            key="opening-meeting"
            title="Opening Meeting"
            icon="mySanitationIcon"
            onPress={this._goToOpeningMeeting}
          />
          {data.map((item: {}) => {
            return (
              <AuditPageItem
                key={`audit-item-${JSON.stringify(item)}`}
                {...item}
                showProgressBar
              />
            );
          })}
          <AuditPageItem
            key="closing-meeting"
            title="Closing Meeting"
            icon="module11"
            onPress={this._goToClosingMeeting}
          />
        </ScrollView>
      </View>
    );
  }
}

AuditPageModules.propTypes = {
  navigation: PropTypes.object,
  modules: PropTypes.object,
};

AuditPageModules.defaultProps = {
  navigation: {
    navigate: () => {},
  },
  modules: {
    token: "",
    getSectionQuestions: () => {},
    checkQuestion: () => {},
    activeModule: null,
    activeSection: null,
    setActiveSection: () => {},
  },
};

export default inject((allStores) => ({
  modules: allStores.modules,
}))(observer(AuditPageModules));
