// @flow

import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Style from './Styles';
import { BasicHeader, Input, BorderedButton } from '../../components';

const initialState = {
  peoples: [],
  name: '',
  position: '',
  numberOfEmployees: '',
  facility: '',
  schedule: '',
  other: '',
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

class OpeningMeeting extends Component {
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

  _onChangeNumber = (text: string) => {
    this.setState({ numberOfEmployees: text });
  }

  _onChangeFacility = (text: string) => {
    this.setState({ facility: text });
  }

  _onChangeSchedule = (text: string) => {
    this.setState({ schedule: text });
  }

  _onChangeOther = (text: string) => {
    this.setState({ other: text });
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
      openingMeeting: local,
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
        value: this.state.numberOfEmployees,
        label: '',
        placeholder: 'Number of employees',
        onChangeText: this._onChangeNumber,
      },
      {
        value: this.state.facility,
        label: '',
        placeholder: 'SQ Ft. of Facility',
        onChangeText: this._onChangeFacility,
      },
      {
        value: this.state.schedule,
        label: '',
        placeholder: 'Production Schedule',
        onChangeText: this._onChangeSchedule,
      },
      {
        value: this.state.other,
        label: '',
        placeholder: 'Other Information',
        onChangeText: this._onChangeOther,
      },
    ];

    return (
      <View style={Style.container}>
        <BasicHeader
          onLeftPress={this._goBack}
          onRightPress={this._submit}
          title="Opening Meeting"
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
          <View style={Style.facilityTitleBlock}>
            <Text style={Style.peopleTitle}>
              Facility description
            </Text>
          </View>
          {data.map((item: {}) => {
            return (
              <Input
                style={Style.input}
                {...item}
                key={`input-${item.placeholder}`}
              />
            );
          })}
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

OpeningMeeting.propTypes = {
  navigation: PropTypes.object,
  modules: PropTypes.object,
};

OpeningMeeting.defaultProps = {
  navigation: {
    navigate: () => {},
  },
  modules: {
    updateAudit: () => {},
  },
};


export default inject((allStores) => ({
  modules: allStores.modules,
}))(observer(OpeningMeeting));
