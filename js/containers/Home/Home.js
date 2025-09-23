// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import Style from './Styles';
import { ActionsList, BasicHeader } from '../../components';

class HomeScreen extends Component {
  _goToNewAudit = () => {
    this.props.navigation.navigate('NewAudit');
  }

  _goToMyAssignments = () => {
    this.props.navigation.navigate('MyAssignments');
  }

  _goToPendingList = () => {
    this.props.navigation.navigate('PendingList');
  }

  _goToInProgress = () => {
    this.props.navigation.navigate('InProgressList');
  }

  _goToMyStats = () => {
    this.props.navigation.navigate('MyStats');
  }

  render() {
    const data = [
      {
        id: 1,
        key: 'Desk Audit',
        image: 'deskAudit',
        onPress: this._goToNewAudit,
      },
      {
        id: 2,
        key: 'Assigned Audits',
        image: 'assignedAudit',
        onPress: this._goToMyAssignments,
      },
      {
        id: 3,
        key: 'Pending Audits',
        image: 'pendingAudit',
        onPress: this._goToPendingList,
        showBadge: true,
        badgeValue: 1,
      },
      {
        id: 4,
        key: 'In Progress',
        image: 'inprogressAudit',
        onPress: this._goToInProgress,
        showBadge: true,
        badgeValue: 2,
      },
      {
        id: 5,
        key: 'My Stats',
        image: 'myStats',
        onPress: this._goToMyStats,
      },
    ];
    return (
      <View style={Style.container}>
        <BasicHeader
          hideLeft
          title="SQF Audits"
        />
        <ScrollView style={Style.content}>
          <ActionsList
            data={data}
          />
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object,
};

HomeScreen.defaultProps = {
  navigation: {
    navigate: () => {},
  },
};

export default HomeScreen;
