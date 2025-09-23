// @flow

import React, { Component } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Style from './Styles';
import { Input, LoginBtn } from '../../components';
import { images } from '../../common/appImages';
import { signin } from '../../network';
import regexp from '../../config/regexp.config';

class Login extends Component {
  constructor(props: {}) {
    super(props);

    this.state = {
      wrongCreds: false,
      email: '',
      password: '',
    };
  }

  _onChangeEmail = (text: string) => {
    this.setState({ email: text });
  }

  _onChangePassword = (text: string) => {
    this.setState({ password: text });
  }

  _submit = () => {
    const { email, password } = this.state;
    if (email && regexp.email.test(email) && !!password && !!password.length) {
      signin({
        email: this.state.email,
        password: this.state.password,
      })
        .then((token: string) => {
          this.props.modules.setEmail(this.state.email);
          this.props.modules.setName(this.state.email);
          this.props.modules.setUserFromCache(this.state.email);
          this.setState({
            email: "",
            password: "",
          });
          this.props.modules.setToken(token);
          // this.props.navigation.navigate('InProgressList');
        })
        .catch(() => {
          this.setState(() => ({ wrongCreds: true }));
        });
    }
  }

  // _showAlert = () => {
  //   const { email, phonenumber } = this.state;
  //   if (email && regexp.email.test(email) && phonenumber && phonenumber.length > 4) {
  //     Alert.alert(
  //       'Number Confirmation:',
  //       `${phonenumber}\n\nIs the phone number above correct?`,
  //       [
  //         {
  //           text: 'Edit',
  //           onPress: () => {},
  //         },
  //         {
  //           text: 'Accept',
  //           onPress: this._submit,
  //         },
  //       ]
  //     );
  //   }
  // }

  render() {
    const form = [
      {
        id: 1,
        value: this.state.email,
        placeholder: 'Email Address',
        onChangeText: this._onChangeEmail,
        multiline: false,
        style: Style.inputBlock,
        titleStyle: Style.title,
        inputStyle: Style.input,
      },
      {
        id: 2,
        value: this.state.password,
        placeholder: 'Enter password',
        secureTextEntry: true,
        onChangeText: this._onChangePassword,
        multiline: false,
        style: Style.inputBlock,
        titleStyle: Style.title,
        inputStyle: Style.input,
      },
    ];

    const login = {
      onPress: this._submit,
      style: Style.loginBtn,
    };

    return (
      <View style={Style.container}>
        <ScrollView
          keyboardShouldPersistTaps="never"
          style={Style.content}
        >
          <View style={Style.form}>
            <Image
              source={images.eagleLoginLogo}
              style={Style.logo}
            />
            <Text style={Style.welcomeText}>
              Welcome to SQF!
            </Text>
            {this.state.wrongCreds &&
              <Text style={Style.error}>
                Wrong email or password
              </Text>
            }
            {form.map((item: {}) => {
              return (
                <Input
                  {...item}
                  key={`input-${item.id}`}
                />
              );
            })}

            <View style={Style.checkboxLoginRow}>
              <LoginBtn
                {...login}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object,
  modules: PropTypes.object,
};

Login.defaultProps = {
  navigation: {
    navigate: () => {},
  },
  modules: {
    setEmail: () => {},
    setPassword: () => {},
  },
};

export default inject((allStores) => ({
  modules: allStores.modules,
}))(observer(Login));
