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
    justifyContent: 'center',
    paddingTop: 0,
  },
  evidenceInput: {
    borderBottomWidth: 0,
  },
  photoBtn: {
    padding: 0,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: 0,
  },
  plusIcon: {
    width: 20,
  },
});
