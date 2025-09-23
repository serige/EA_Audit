// @flow

import React, { Component } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import PropTypes from 'prop-types';
import Style from './Styles';


export default class ConfirmationCode extends Component {
  _codeInput = null;

  _resendCode = () => {
    if (this._codeInput) {
      this._codeInput.clear();
    }

    // TODO: SEND BACKEND REQUEST HERE;
  }

  _showErrorAlert = () => {
    Alert.alert(
      'Incorrect Activation Code',
      `Resend new code to phone?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Accept',
          onPress: this._resendCode,
        },
      ]
    );
  }

  _showSuccessAlert = () => {
    this.props.navigation.navigate('InProgressList');
    Alert.alert(
      '',
      `Your account has been created!`,
      [
        {
          text: 'Get Started',
          onPress: () => {},
        },
      ]
    );
  }

  _onFinishCheckingCode = (code: string) => {
    console.log('code: ', code);

    // TODO: SEND BACKEND REQUEST HERE AND HANDLE SERVER RESPONSE
    this._showSuccessAlert();
  }

  render() {
    return (
      <View style={Style.container}>
        <ScrollView
          keyboardShouldPersistTaps="never"
          style={Style.content}
        >
          <View style={Style.form}>
            <Text
              style={Style.label}
            >
              To complete your phone number verification, please enter the 6 digit activation code:
            </Text>
            <CodeInput
              ref={(ref: { clear: () => void }) => {
                this._codeInput = ref;
              }}
              codeInputStyle={Style.codeInputStyle}
              keyboardType="numeric"
              codeLength={6}
              className="border-box"
              autoFocus={false}
              onFulfill={(isValid, code) => this._onFinishCheckingCode(isValid, code)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

ConfirmationCode.propTypes = {
  navigation: PropTypes.object,
};

ConfirmationCode.defaultProps = {
  navigation: {
    navigate: () => {},
    state: {
      params: {},
    },
  },
};
