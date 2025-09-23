// @flow

import { StyleSheet, Platform } from 'react-native';
import Fonts from '../../theme/Fonts';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    minHeight: 120,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.fontFamily.AvenirMedium,
    color: colors.black,
  },
  input: {
    paddingLeft: 0,
    fontSize: 18,
    fontFamily: Fonts.fontFamily.AvenirMedium,
    color: colors.assignmentDescription,
    ...Platform.select({
      ios: {
        marginTop: 15,
      },
      android: {
        marginTop: 5,
      },
    }),
  },
});
