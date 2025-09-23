// @flow

import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.bgPrimary,
    height: 65,
    position: 'relative',
    ...Platform.select({
      ios: {
        paddingTop: 10,
      },
    }),
  },
  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 65,
    width: 140,
  },
});
