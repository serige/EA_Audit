// @flow

import React, { Component } from 'react';
import { View, ScrollView, Keyboard, Alert } from 'react-native';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Style from './Styles';
import { BasicHeader, TextDivider, SelectItem } from '../../components';

const initialState = {
  name: '',
  companyNumber: '',
  auditNumber: '',
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

class NewAuditModules extends Component {
  constructor(props: {}) {
    super(props);

    this.state = { ...mergeState(initialState, this._getParams()), selected: [] };
  }

  nextPress = false;

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

  _validate = () => {
    const hasName = this.state.name.length > 0;
    const hasCompanyNumber = this.state.companyNumber.length > 0;
    const hasAuditNumber = this.state.auditNumber.length > 0;

    return hasName && hasCompanyNumber && hasAuditNumber;
  }

  _onItemPress = (item: {id: number, title: string}) => {
    if (this.state.selected.indexOf(item.id) !== -1) {
      this.setState({
        selected: this.state.selected.filter(s => s !== item.id),
      });
    } else {
      this.setState({
        selected: [
          ...this.state.selected,
          item.id,
        ],
      });
    }
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
    if (!this.nextPress) {
      this.nextPress = true;
      Keyboard.dismiss();
      const params = this._getParams();
      if (params) {
        this.props.modules.addAudit(params);
        this.props.navigation && this.props.navigation.navigate('AuditPage');
      }

      setTimeout(() => {
        this.nextPress = false;
      }, 1000);
    }
  }

  render() {
    return (
      <View style={Style.container}>
        <BasicHeader
          onLeftPress={this._goBack}
          onRightPress={this._goToModules}
          title="New Audit"
          showRight
          disabledRight={!this.state.selected.length}
          rightLabel="Next"
        />
        <TextDivider
          bold
          title="Select Modules for Audit"
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={Style.content}
        >

          {
            this.props.modules.fakeModules.map(item => (
              <SelectItem
                key={item.id}
                title={item.title}
                onPress={() => this._onItemPress(item)}
                value={this.state.selected.indexOf(item.id) !== -1}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

NewAuditModules.propTypes = {
  navigation: PropTypes.object,
  modules: PropTypes.object,
};

NewAuditModules.defaultProps = {
  navigation: {
    navigate: () => {},
  },
  modules: {
    addAudit: () => {},
  },
};

export default inject((allStores) => ({
  modules: allStores.modules,
}))(observer(NewAuditModules));
