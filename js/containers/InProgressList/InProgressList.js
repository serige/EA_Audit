// @flow

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Style from './Styles';
import { BasicHeader, AssignmentItem, NewAuditBtn, TextDivider } from '../../components';

class InProgressList extends Component {
  _goBack = () => {
    this.props.modules.logout();
    this.props.navigation.popToTop();
  }

  _onEditPress = (item: {}) => {
    this.props.modules.setActiveCompany(item.id);
    this.props.navigation.navigate('InProgressItem', { ...item, editable: false });
  }

  _onItemPress = (item: {}) => {
    this.props.modules.setActiveCompany(item.id);
    this.props.navigation && this.props.navigation.navigate('AuditPage');
  }

  _onNewPress = () => {
    this.props.navigation.navigate('NewAudit');
  }

  _getData = () => {
    return this.props.modules.inProgressAuditList.map((item: {}) => {
      return {
        ...item,
        onPress: this._onItemPress,
        onEditPress: this._onEditPress,
      };
    });
  }

  _getSubmittedData = () => {
    return this.props.modules.submittedAuditList.map((item: {}) => {
      return {
        ...item,
        onPress: () => {},
      };
    });
  }

  render() {
    const data = this._getData();
    const submittedData = this._getSubmittedData();
    return (
      <View style={Style.container}>
        <BasicHeader
          onLeftPress={this._goBack}
          leftLabel="Logout"
          title="SQF Audits"
        />
        <ScrollView style={Style.content}>
          <NewAuditBtn
            title="Start New Audit"
            onPress={this._onNewPress}
          />
          <TextDivider
            title="Audits In Progress"
          />
          {data.map((item: {}) => {
            return (
              <AssignmentItem
                key={`assignment-${JSON.stringify(item)}`}
                {...item}
                showEdit
                value={item.percents}
                showProgressBar
                subDescription={item.place}
              />
            );
          })}
          <TextDivider
            title="Submitted Audits"
          />
          {submittedData.map((item: {}) => {
            return (
              <AssignmentItem
                key={`assignment-${JSON.stringify(item)}`}
                {...item}
                value={item.percents}
                showProgressBar={false}
                subDescription={item.place}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

InProgressList.propTypes = {
  navigation: PropTypes.object,
  modules: PropTypes.object,
};

InProgressList.defaultProps = {
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
}))(observer(InProgressList));
