// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {},
  textBlock: {
    paddingTop: 30,
  },
  item: {
    flexDirection: 'column',
  },
});
