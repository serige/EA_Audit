// @flow

import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import Style from './Styles';
import { BasicHeader, SingleCheckBoxItem } from '../../components';

class ModulePage extends Component {
  constructor(props: {}) {
    super(props);

    const module = this.props.modules.getModule(this.props.modules.activeModule);
    this.state = {
      disableCheckbox: module.disableCheckbox,
    };
  }

  navigateToHome() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  _goBack = () => {
    this.props.navigation && this.props.navigation.goBack();
  }

  _submit = () => {
    Alert.alert(
      'Form Submitted Successfully',
      '',
      [
        { text: 'OK', onPress: () => this.navigateToHome() },
      ]
    );
  }

  _onItemPress = (item: {}, value: boolean) => {
    if (!this.state.disableCheckbox) {
      const { activeModule: mId, activeSection: sId } = this.props.modules;
      this.props.modules.checkQuestion(mId, sId, item, value);
    }
  }

  _onItemFilled = (item: {}, value: boolean, info: {}) => {
    const { activeModule: mId, activeSubmodule: smId, activeSection: sId } = this.props.modules;
    this.props.modules.checkQuestion(mId, smId, sId, item, value, info);
  }

  _onPress = (id: string) => {
    const questions = this.props.modules.getSectionQuestions(this.props.modules.activeSection);
    const item = {
      id,
      title: `Module ${id}`,
      ...questions[id],
    };

    this.props.navigation && this.props.navigation.navigate('ModuleDetailPage', {
      ...item,
      subpoints: item.subpoints ? item.subpoints.slice() : [],
      submit: this._onItemFilled,
    });
  }

  _getTitle = () => {
    const { navigation } = this.props;
    if ((navigation && navigation.state) && navigation.state.params) {
      return navigation.state.params.title || 'Module Page';
    }

    return null;
  }

  _getData = () => {
    const questions = this.props.modules.getSectionQuestions(this.props.modules.activeSection);
    const data = [];
    const keys = Object.keys(questions);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key && questions[key]) {
        data.push({
          id: key,
          ...questions[key],
        });
      }
    }
    return data;
  }

  _formValid = () => {
    let isValid = true;
    const questions = this.props.modules.getSectionQuestions(this.props.modules.activeSection);
    const keys = Object.keys(questions);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key && questions[key] && !questions[key].isActive) {
        isValid = false;
      }
    }

    return isValid;
  }

  _hasStatus = (item: {}) => {
    const notEmptyString = ((item) && item.status !== '');
    const notNull = ((item) && item.status !== null);
    const notUndefined = ((item) && item.status !== undefined);
    const notZero = ((item) && item.status !== 0);
    const notFalse = ((item) && item.status !== false);

    return (notEmptyString && notNull && notUndefined && notZero && notFalse);
  }

  render() {
    const title = this._getTitle();
    const data = this._getData();
    const formValid = this._formValid();
    return (
      <View style={Style.container}>
        <BasicHeader
          onLeftPress={this._goBack}
          onRightPress={this._submit}
          title={title}
          hasIcon
          disabledRight={!formValid}
          rightIcon="upload"
        />
        <ScrollView style={Style.content}>
          {data.map((item: {}) => {
            const subpoints = item.subpoints ? item.subpoints.slice() : [];

            return (
              <SingleCheckBoxItem
                {...item}
                showScore={this._hasStatus(item)}
                points={item.points}
                customText={item.status}
                subpoints={subpoints}
                key={item.id}
                disableCheckbox={this.state.disableCheckbox}
                onPress={this._onPress}
                onItemSelect={this._onItemPress}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

ModulePage.propTypes = {
  navigation: PropTypes.object,
  modules: PropTypes.object,
};

ModulePage.defaultProps = {
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
}))(observer(ModulePage));
