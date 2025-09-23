// @flow

import React, { Component } from 'react';
import { View, ScrollView, Keyboard, Alert } from 'react-native';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Style from './Styles';
import { BasicHeader, Input, FormItemCalendarPicker } from '../../components';

const initialState = {
  name: '',
  companyNumber: '',
  auditNumber: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  editable: true,
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

class NewAudit extends Component {
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

  _onChangeCompanyNumber = (text: string) => {
    this.setState({ companyNumber: text });
  }

  _onChangeAuditNumber = (text: string) => {
    this.setState({ auditNumber: text });
  }

  _onChangeCity = (text: string) => {
    this.setState({ city: text });
  }

  _onChangeState = (text: string) => {
    this.setState({ state: text });
  }

  _onChangeStartDate = (text: string) => {
    this.setState({ startDate: text });
  }

  _onChangeEndDate = (text: string) => {
    this.setState({ endDate: text });
  }

  _validate = () => {
    const hasName = this.state.name.length > 0;
    const hasCompanyNumber = this.state.companyNumber.length > 0;
    const hasAuditNumber = this.state.auditNumber.length > 0;
    const hasCity = this.state.city.length > 0;
    const hasState = this.state.state.length > 0;
    const hasStartDate = !!this.state.startDate;
    const hasEndDate = !!this.state.endDate;

    return (
      hasName &&
      hasCompanyNumber &&
      hasAuditNumber &&
      hasCity &&
      hasState &&
      hasStartDate &&
      hasEndDate
    );
  }

  _goBack = () => {
    Alert.alert(
      'Are you sure you want to leave the audit?',
      '',
      [
        {
          text: 'Yes',
          onPress: () => {
            this.props.navigation && this.props.navigation.goBack();
          },
        },
        { text: 'No', onPress: () => (null) },
      ]
    );
  }

  _goToModules = () => {
    Keyboard.dismiss();
    // const params = this._getParams();
    // if (!params) {
    //   this.props.modules.addAudit(this.state);
    // }
    this.props.navigation && this.props.navigation.navigate('NewAuditModules', { ...this.state });
  }

  render() {
    const data = [
      {
        value: this.state.name,
        label: 'Company Name',
        placeholder: 'Enter Name',
        onChangeText: this._onChangeName,
        editable: this.state.editable,
      },
      {
        value: this.state.companyNumber,
        label: 'Company Number',
        placeholder: 'Enter Company Number',
        onChangeText: this._onChangeCompanyNumber,
        editable: this.state.editable,
      },
      {
        value: this.state.auditNumber,
        label: 'Audit Number',
        placeholder: 'Enter Audit Number',
        onChangeText: this._onChangeAuditNumber,
        editable: this.state.editable,
      },
      {
        value: this.state.city,
        label: 'City',
        placeholder: 'Enter City',
        onChangeText: this._onChangeCity,
        editable: this.state.editable,
      },
      {
        value: this.state.state,
        label: 'State',
        placeholder: 'Enter State',
        onChangeText: this._onChangeState,
        editable: this.state.editable,
      },
      {
        value: this.state.startDate,
        title: 'Start Date',
        placeholder: 'Select Start Date',
        type: 'date',
        onValueChange: this._onChangeStartDate,
        editable: this.state.editable,
      },
      {
        value: this.state.endDate,
        title: 'End Date',
        placeholder: 'Select End Date',
        type: 'date',
        onValueChange: this._onChangeEndDate,
        editable: this.state.editable,
      },
    ];

    const isValid = this._validate();
    return (
      <View style={Style.container}>
        <BasicHeader
          onLeftPress={this._goBack}
          onRightPress={this._goToModules}
          title="New Audit"
          showRight
          disabledRight={!isValid}
          rightLabel="Next"
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={Style.content}
        >
          {data.map((item: {}) => {
            if (item.type === "date") {
              return (
                <FormItemCalendarPicker
                  {...item}
                />
              );
            }
            return (
              <Input key={`input-${item.label}`} {...item} />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

NewAudit.propTypes = {
  navigation: PropTypes.object,
  modules: PropTypes.object,
};

NewAudit.defaultProps = {
  navigation: {
    navigate: () => {},
  },
  modules: {
    addAudit: () => {},
  },
};

export default inject((allStores) => ({
  modules: allStores.modules,
}))(observer(NewAudit));
