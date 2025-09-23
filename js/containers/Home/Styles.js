// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {},
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: -1,
    right: 0,
  },
});
