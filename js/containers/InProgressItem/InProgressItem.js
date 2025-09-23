// @flow

import React, { Component } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Style from './Styles';
import { BasicHeader, CheckboxRow, BorderedButton } from '../../components';
import { submit } from '../../network';

class InProgressItem extends Component {
  constructor(props: {}) {
    super(props);

    this.state = {
      pendingActions: this.props.modules.getAuditQuestions,
    };
  }

  _goBack = () => {
    this.props.navigation && this.props.navigation.goBack();
  }

  _onItemPress = (uniqueKey: string, selected: boolean) => {
    let index = null;
    let update = null;

    this.state.pendingActions.map((item: {}, i: string) => {
      if (item.uniqueKey === uniqueKey) {
        index = i;
        update = {
          ...item,
          selected,
        };
      }
    });

    this.setState({
      pendingActions: [
        ...this.state.pendingActions.slice(0, index),
        update,
        ...this.state.pendingActions.slice(index + 1),
      ],
    });
  }

  _getParams = () => {
    const { navigation } = this.props;
    if ((navigation && navigation.state) && navigation.state.params) {
      return navigation.state.params;
    }

    return null;
  }

  _sendBackendRequest = () => {
    submit(this.props.modules.token, this.props.modules.requestBody)
      .then(() => {
        this._moveToSubmitted();
        Alert.alert(
          'Audit saved',
          '',
          [
            {
              text: 'OK',
              onPress: () => {
                this._goBack();
              },
            },
          ]
        );
      })
      .catch(() => {
        Alert.alert(
          'Something went wrong. Please, try again later',
          '',
          [
            { text: 'OK', onPress: () => {} },
          ]
        );
      });
  }

  _submit = () => {
    const checked = this.state.pendingActions.filter(item => item.selected);

    // FOR TESTING
    if (this.state.pendingActions.length === checked.length && this.props.modules.token) {
      Alert.alert(
        'Are you sure you’re ready to close out this audit?',
        '',
        [
          { text: 'Yes', onPress: () => this._sendBackendRequest() },
          { text: 'No', onPress: () => (null) },
        ]
      );
    }
    // FOR TESTING
    // console.log("this.state.pendingActions.length: ", this.state.pendingActions.length);
    // console.log("checked.length: ", checked.length);
    // FOR PRODUCTION
    // if (this.state.pendingActions.length === checked.length && this.props.modules.mandatorySubmitted && this.props.modules.token) {
    //   Alert.alert(
    //     'Are you sure you’re ready to close out this audit?',
    //     '',
    //     [
    //       { text: 'Yes', onPress: () => this._sendBackendRequest() },
    //       { text: 'No', onPress: () => (null) },
    //     ]
    //   );
    // } else if (this.state.pendingActions.length === checked.length && !this.props.modules.mandatorySubmitted) {
    //   Alert.alert(
    //     'Need to finish the Mandatory items before checking out',
    //     '',
    //     [
    //       { text: 'OK', onPress: () => {} },
    //     ]
    //   );
    // }
    // FOR PRODUCTION
  }

  _moveToSubmitted = () => {
    const params = this._getParams();

    this.props.modules.moveAuditToSubmitted(params.id);
    this.props.modules.deleteAudit(params.id);

    // this._navigateToHome();
  }

  _navigateToHome() {
    this.state.pendingActions.map((item: {}) => {
      if (item.selected) {
        this.props.modules.checkQuestionAsSolved(item.mId, item.smId, item.ssmId, item.id);
      }
    });

    this.props.modules.resetActiveCompany(this._getParams().id);
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'InProgressList' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  _save = () => {
    this.state.pendingActions.map((item: {}) => {
      if (item.selected) {
        this.props.modules.checkQuestionAsSolved(item.mId, item.smId, item.ssmId, item.id);
      }
    });

    this.props.navigation && this.props.navigation.goBack();
  }

  render() {
    const params = this._getParams();
    const modules = this.props.modules.getAuditModules(params.id);
    return (
      <View style={Style.container}>
        <BasicHeader
          onLeftPress={this._goBack}
          onRightPress={this._save}
          title="In Progress"
          showRight
          rightLabel="Save"
        />
        <ScrollView contentContainerStyle={Style.content}>
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

          <View style={Style.pendingActions}>
            <Text style={Style.moduleTitle}>
              Pending Corrective Actions:
            </Text>
          </View>
          {
            this.state.pendingActions.map((item: {}) => {
              return (
                <CheckboxRow
                  key={`checkbox-row-${item.uniqueKey}`}
                  isActive={item.selected}
                  hideId
                  id={item.id}
                  description={`${item.id} ${item.corrective}`}
                  onPress={() => {}}
                  subpoints={[]}
                  onItemSelect={(isActive: boolean) => this._onItemPress(item.uniqueKey, isActive)}
                />
              );
            })
          }
          <View style={Style.buttonRow}>
            <BorderedButton
              style={Style.button}
              text="Check out Audit"
              onPress={this._submit}
            />
          </View>

        </ScrollView>
      </View>
    );
  }
}

InProgressItem.propTypes = {
  navigation: PropTypes.object,
  modules: PropTypes.object,
};

InProgressItem.defaultProps = {
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
}))(observer(InProgressItem));
