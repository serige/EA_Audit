// @flow

import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Style from './Styles';
import { BasicHeader, Input, BorderedButton, AuditScore, BubbleRow } from '../../components';

const initialState = {
  peoples: [],
  name: '',
  position: '',
  recommendation: '',
};

const mergeState = (initial: Object, propState: Object) => {
  let state = { ...initial };

  if (propState) {
    state = {
      ...state,
      ...propState,
    };
  }

  return state;
};

class ClosingMeeting extends Component {
  constructor(props: {}) {
    super(props);
    this.state = { ...mergeState(initialState, this._getParams()) };
  }

  _getParams = () => {
    const { navigation } = this.props;
    if ((navigation && navigation.state) && navigation.state.params) {
      return navigation.state.params;
    }

    return null;
  }

  _onChangeName = (text: string) => {
    this.setState({ name: text });
  }

  _onChangePosition = (text: string) => {
    this.setState({ position: text });
  }

  _submitPeopleForm = () => {
    if (this.state.name && this.state.position) {
      this.setState({
        peoples: [
          ...this.state.peoples,
          {
            name: this.state.name,
            position: this.state.position,
          },
        ],
        name: '',
        position: '',
      });
    }
  }

  _onChangeRecommendation = (text: string) => {
    this.setState({ recommendation: text });
  }

  _goBack = () => {
    this.props.navigation && this.props.navigation.goBack();
  }

  _submit = () => {
    const local = {
      ...this.state,
    };

    delete local.name;
    delete local.position;
    this.props.modules.updateAudit(this.props.modules.activeCompany, {
      closingMeeting: local,
    });
    this.props.navigation && this.props.navigation.goBack();
  }

  render() {
    const peopleInputs = [
      {
        value: this.state.name,
        label: '',
        placeholder: 'Name',
        onChangeText: this._onChangeName,
      },
      {
        value: this.state.position,
        label: '',
        placeholder: 'Position',
        onChangeText: this._onChangePosition,
      },
    ];
    const data = [
      {
        value: this.state.recommendation,
        label: 'Auditor Recommendation',
        placeholder: 'Enter Recommendations',
        onChangeText: this._onChangeRecommendation,
      },
    ];

    const auditQuestions = this.props.modules.getAuditQuestions;

    return (
      <View style={Style.container}>
        <BasicHeader
          onLeftPress={this._goBack}
          onRightPress={this._submit}
          title="Closing Meeting"
        />
        <ScrollView
          keyboardShouldPersistTaps="never"
          style={Style.content}
        >
          <View style={Style.peopleTitleBlock}>
            <Text style={Style.peopleTitle}>
              People present at meeting
            </Text>
          </View>
          {
            this.state.peoples.map((item: {}) => {
              return (
                <View style={Style.peopleRow}>
                  <Text style={Style.peopleText}>
                    Name: {item.name}
                  </Text>
                  <Text style={Style.peopleText}>
                    Position: {item.position}
                  </Text>
                </View>
              );
            })
          }
          {peopleInputs.map((item: {}) => {
            return (
              <Input
                style={Style.input}
                {...item}
                key={`input-${item.placeholder}`}
              />
            );
          })}
          <View style={Style.peopleButtonRow}>
            <BorderedButton
              style={Style.button}
              text="Add new person"
              onPress={this._submitPeopleForm}
            />
          </View>

          {data.map((item: {}) => {
            return (
              <Input
                {...item}
                key={`input-${item.placeholder}`}
              />
            );
          })}
          <AuditScore
            title="Preliminary Score"
            points={this.props.modules.totalScore}
          />

          <View style={Style.peopleTitleBlock}>
            <Text style={Style.peopleTitle}>
              Pending Corrective Actions
            </Text>
          </View>

          {
            auditQuestions.map((item: {}) => {
              return (
                <BubbleRow
                  key={`bubble-${item.id}`}
                  title={`${item.id} ${item.corrective || ''}`}
                  points={item.points || null}
                  status={item.status || null}
                />
              );
            })
          }

          <View style={Style.buttonRow}>
            <BorderedButton
              style={Style.button}
              text="Save"
              onPress={this._submit}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

ClosingMeeting.propTypes = {
  navigation: PropTypes.object,
  modules: PropTypes.object,
};

ClosingMeeting.defaultProps = {
  navigation: {
    navigate: () => {},
  },
  modules: {},
};

export default inject((allStores) => ({
  modules: allStores.modules,
}))(observer(ClosingMeeting));
