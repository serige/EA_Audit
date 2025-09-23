// @flow

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Style from './Styles';
import {
  BasicHeader,
  Input,
  ModuleDescription,
  ModalPicker,
  CompliantSelect,
} from '../../components';

const initialState = {
  status: null,
  additional: '',
  corrective: '',
  evidence: '',
  showModal: false,
  mandatory: false,
  sectionSummary: '',
};

const mergeState = (initial: Object, propState: Object) => {
  let state = { ...initial };

  if (propState) {
    state = {
      ...state,
      ...propState,
      status: null,
    };
    delete state.status;
  }

  return state;
};

class ModuleDetailPage extends Component {
  constructor(props: {}) {
    super(props);
    const params = this._getParams();
    const initState = mergeState(initialState, params);
    this.props.modules.pickerList.map((item: {}) => {
      if (item.title === params.status) {
        initState.status = item;
      }
    });
    this.state = { ...initState };
    this.picker = null;
  }

  _getParams = () => {
    const { navigation } = this.props;
    if ((navigation && navigation.state) && navigation.state.params) {
      return navigation.state.params;
    }

    return null;
  }

  _onChangeEvidence = (text: string) => {
    this.setState({ evidence: text });
  }

  _onChangeAdditional = (text: string) => {
    this.setState({ additional: text });
  }

  _onChangeCorrective = (text: string) => {
    this.setState({ corrective: text });
  }

  _onChangeSectionSummary = (text: string) => {
    this.setState({ sectionSummary: text });
  }

  _validate = () => {
    const hasEvidence = this.state.evidence.length > 0;

    return hasEvidence;
  }

  _validateInput = () => !!this.state.sectionSummary.length;

  _goBack = () => {
    this.props.navigation && this.props.navigation.goBack();
  }

  _submit = () => {
    const { additional, corrective, evidence } = this.state;
    const points = this.state.status ? this.state.status.points : 0;
    const status = this.state.status ? this.state.status.title : '';
    const additionalInfo = {
      points,
      additional,
      corrective,
      status,
      evidence,
    };

    const { submit, id } = this._getParams();
    submit(id, true, additionalInfo);
    this.props.navigation && this.props.navigation.goBack();
  }

  _submitInput = () => {
    const { sectionSummary } = this.state;
    const additionalInfo = {
      sectionSummary,
    };

    const { submit, id } = this._getParams();
    submit(id, true, additionalInfo);
    this.props.navigation && this.props.navigation.goBack();
  }

  _hidePicker = () => {
    this.setState({ showModal: false });
  }

  _showPicker = () => {
    this.setState({ showModal: true });
  }

  _onItemChoose = (item: {}) => {
    this.setState({
      status: item,
      showModal: false,
    });
  }

  _getTitle = () => {
    const { navigation } = this.props;
    if ((navigation && navigation.state) && navigation.state.params) {
      return navigation.state.params.title || 'Module Detail Page';
    }

    return null;
  }

  _getPickerItems = () => {
    if (this.state.mandatory) {
      return this.props.modules.pickerList.filter(item => item.pickerId !== 4);
    }
    return this.props.modules.pickerList;
  }

  render() {
    const title = this._getTitle();
    const data = [
      {
        value: this.state.evidence,
        label: 'Evidence',
        placeholder: 'Enter Evidence Here',
        onChangeText: this._onChangeEvidence,
      },
    ];

    const inputData = [
      {
        value: this.state.sectionSummary,
        label: 'Summary',
        placeholder: 'Enter Summary Here',
        onChangeText: this._onChangeSectionSummary,
      },
    ];

    const correctiveActions = [
      {
        value: this.state.additional,
        label: 'Additional Action Needed',
        placeholder: 'Enter Action Needed',
        onChangeText: this._onChangeAdditional,
      },
      {
        value: this.state.corrective,
        label: 'Corrective Action',
        placeholder: 'Enter Action Needed',
        onChangeText: this._onChangeCorrective,
      },
    ];

    const isValid = this.state.type === "input" ? this._validateInput() : this._validate();
    const { description, subpoints } = this._getParams();

    return (
      <View style={Style.container}>
        <BasicHeader
          onLeftPress={this._goBack}
          onRightPress={this.state.type === "input" ? this._submitInput : this._submit}
          title={title}
          showRight
          disabledRight={!isValid}
          rightLabel="Save"
        />
        {this.state.type !== "input" &&
          <ScrollView
            keyboardShouldPersistTaps="never"
            style={Style.content}
          >
            <ModuleDescription
              description={description}
              subpoints={subpoints || []}
            />
            <CompliantSelect
              onPress={this._showPicker}
              textBlock={Style.textBlock}
              key="compliance-status"
              title="Compliance Status"
              customText={this.state.status && this.state.status.title}
              showScore={this.state.status && this.state.status.title !== ''}
              points={this.state.status && this.state.status.points}
            />
            {data.map((item: {}) => {
              return (
                <Input
                  {...item}
                  multiline
                  key={`input-${item.label}`}
                  style={Style.evidenceInput}
                />
              );
            })}
            {correctiveActions.map((item: {}) => {
              return (
                <Input
                  {...item}
                  multiline
                  key={`input-${item.label}`}
                />
              );
            })}
          </ScrollView>
        }
        {this.state.type === "input" &&
          <ScrollView
            keyboardShouldPersistTaps="never"
            style={Style.content}
          >
            {inputData.map((item: {}) => {
              return (
                <Input
                  {...item}
                  multiline
                  key={`input-${item.label}`}
                  style={Style.evidenceInput}
                />
              );
            })}
          </ScrollView>
        }
        <ModalPicker
          show={this.state.showModal}
          items={this._getPickerItems()}
          onPress={this._onItemChoose}
          onClose={this._hidePicker}
        />
      </View>
    );
  }
}

ModuleDetailPage.propTypes = {
  navigation: PropTypes.object,
  modules: PropTypes.object,
};

ModuleDetailPage.defaultProps = {
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
}))(observer(ModuleDetailPage));
