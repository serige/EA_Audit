// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  listArea: {
    paddingHorizontal: 10,
    flex: 1,
  },
  pagiButton: {
    width: 60,
    height: 60,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: colors.borderColor,
  },
});
