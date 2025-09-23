// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {},
  form: {
    paddingTop: 80,
    paddingLeft: 25,
    paddingRight: 25,
  },
  label: {
    textAlign: "center",
  },
  codeInputStyle: {
    width: 40,
    height: 40,
    color: colors.borderColor,
    borderColor: colors.borderColor,
  },
});
