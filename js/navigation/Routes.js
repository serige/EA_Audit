// @flow
import React, { Component } from 'react';
import { View, StyleSheet, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import { inject, observer } from 'mobx-react';
// import Home from '../containers/HomeScreen';
import Home from '../containers/Home';
import OptionsList from '../containers/OptionsListScreen';
import Checklist from '../containers/ChecklistScreen';
import MyAssignments from '../containers/MyAssignments';
import PendingList from '../containers/PendingList';
import PendingAudit from '../containers/PendingAudit';
import NewAudit from '../containers/NewAudit';
import NewAuditModules from '../containers/NewAuditModules';
// import AuditPage from '../containers/AuditPage';
import AuditPage from '../containers/AuditPageModules';
import FacilityAudit from '../containers/FacilityAudit';
import Submodule from '../containers/Submodule';
import ModulePage from '../containers/ModulePage';
import ModuleDetailPage from '../containers/ModuleDetailPage';
import OpeningMeeting from '../containers/OpeningMeeting';
import ClosingMeeting from '../containers/ClosingMeeting';
import InProgressList from '../containers/InProgressList';
import InProgressItem from '../containers/InProgressItem';
import Login from '../containers/Login';
import MyStats from '../containers/MyStats';
import ConfirmationCode from '../containers/ConfirmationCode';

// eslint-disable-next-line

const ROUTES = {
  Home: {
    screen: Home,
    path: '/Home',
  },
  OptionsList: {
    screen: OptionsList,
    path: '/OptionsList',
  },
  Checklist: {
    screen: Checklist,
    path: '/Checklist',
  },
  MyAssignments: {
    screen: MyAssignments,
    path: '/MyAssignments',
  },
  NewAudit: {
    screen: NewAudit,
    path: '/NewAudit',
  },
  NewAuditModules: {
    screen: NewAuditModules,
    path: '/NewAuditModules',
  },
  AuditPage: {
    screen: AuditPage,
    path: '/AuditPage',
  },
  FacilityAudit: {
    screen: FacilityAudit,
    path: '/FacilityAudit',
  },
  Submodule: {
    screen: Submodule,
    path: '/Submodule',
  },
  ModulePage: {
    screen: ModulePage,
    path: '/ModulePage',
  },
  ModuleDetailPage: {
    screen: ModuleDetailPage,
    path: '/ModuleDetailPage',
  },
  PendingList: {
    screen: PendingList,
    path: '/PendingList',
  },
  PendingAudit: {
    screen: PendingAudit,
    path: '/PendingAudit',
  },
  OpeningMeeting: {
    screen: OpeningMeeting,
    path: '/OpeningMeeting',
  },
  ClosingMeeting: {
    screen: ClosingMeeting,
    path: '/ClosingMeeting',
  },
  InProgressList: {
    screen: InProgressList,
    path: '/InProgressList',
  },
  InProgressItem: {
    screen: InProgressItem,
    path: '/InProgressItem',
  },
  Login: {
    screen: Login,
    path: '/Login',
  },
  MyStats: {
    screen: MyStats,
    path: '/MyStats',
  },
  ConfirmationCode: {
    screen: ConfirmationCode,
    path: '/ConfirmationCode',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


class Navigator extends Component {
  constructor(props: {modules: {clearStore: Function}}) {
    super(props);

    this.navigator = null;
    this.backPressSubscriptions = new Set();
  }

  componentDidMount() {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    DeviceEventEmitter.addListener('hardwareBackPress', () => {
      // let invokeDefault = true;
      const subscriptions = [];

      this.backPressSubscriptions.forEach(sub => subscriptions.push(sub));

      for (let i = 0; i < subscriptions.reverse().length; i += 1) {
        if (subscriptions[i]()) {
          // invokeDefault = false;
          break;
        }
      }

      // if (invokeDefault) {
      //   BackHandler.exitApp();
      // }
    });

    this.backPressSubscriptions.add(this.handleHardwareBack);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    this.backPressSubscriptions.clear();
  }

  handleHardwareBack = () => {
    if (this.navigator.state.nav) {
      const { index, routes } = this.navigator.state.nav;
      if (routes[index].routeName === 'AuditPage') {
        this.navigator._navigation.popToTop();
        this.props.modules.clearStore();
        return true;
      } else {
        this.navigator._navigation.pop();
        return true;
      }
    }
    return false;
  }


  initRouter = () => {
    let initialRouteName = "Login";
    const { modules } = this.props;
    if (modules && modules.isHydrated && modules.token) {
      initialRouteName = "InProgressList";
    }

    return StackNavigator(ROUTES, { // eslint-disable-line
      headerMode: 'none',
      initialRouteName,
    });
  };

  render() {
    if (!this.props.modules.isHydrated) {
      return null;
    }

    const Router = this.initRouter();
    return (
      <View style={styles.container}>
        <Router
          ref={(nav: {}) => { this.navigator = nav; }}
        />
      </View>
    );
  }
}

Navigator.propTypes = {
  modules: PropTypes.object,
};

Navigator.defaultProps = {
  modules: {
    clearStore: () => {},
  },
};

export default inject((allStores) => ({
  modules: allStores.modules,
}))(observer(Navigator));
