// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    height: 13,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.progressBarBorderColor,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  active: {
    borderRadius: 20,
    backgroundColor: colors.progressBarColor,
  },
  text: {
    color: colors.percentsColor,
  },
  activeBlock: {

  },
  inactiveBlock: {

  },
});
