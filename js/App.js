// @flow

import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'mobx-react/native';
import Routes from './navigation/Routes';
import { setImages } from './common/appImages';
import { setColors } from './common/appColors';
import stores from './stores';

setImages('sqf');
setColors('sqf');

class App extends Component {
  constructor(props: {}) {
    super(props);
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider
        {...stores}
      >
        <Routes />
      </Provider>
    );
  }
}
export default App;

