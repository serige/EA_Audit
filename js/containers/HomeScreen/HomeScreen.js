// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Style from './Styles';
import { ActionsList, BasicHeader } from '../../components';

class HomeScreen extends Component {
  _goToNewAudit = () => {
    this.props.navigation.navigate('NewAudit');
  }

  _goToMyAssignmentss = () => {
    this.props.navigation.navigate('MyAssignments');
  }

  render() {
    const data = [
      {
        id: 1,
        key: 'Start New Audit',
        image: 'myFormsIcon',
        onPress: this._goToNewAudit,
      },
      {
        id: 2,
        key: 'Assigned Audits',
        image: 'assignedAudits',
        onPress: this._goToMyAssignmentss,
      },
    ];
    return (
      <View style={Style.container}>
        <BasicHeader
          hideLeft
          title="SQF Audits"
        />
        <View style={Style.content}>
          <ActionsList
            data={data}
          />
        </View>
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
