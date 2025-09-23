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
  placeholder: {
    fontSize: 18,
    fontFamily: Fonts.fontFamily.AvenirMedium,
    color: colors.assignmentDescription,
  },
  // container: {
  //   paddingTop: 20,
  //   paddingBottom: 15,
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   borderBottomWidth: 1,
  //   borderBottomColor: colors.sousVideBorderBottom,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  inputBlock: {
    flex: 0.65,
  },
  inputTitle: {
    fontSize: 18,
    color: colors.charcolBlack,
  },
  valueblock: {
    flex: 0.35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pickerBody: {
    borderWidth: 0,
    paddingRight: 0,
    alignItems: "flex-start",
  },
});
