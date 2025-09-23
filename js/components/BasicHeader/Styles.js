// @flow

import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../common/appColors';
import Fonts from '../../theme/Fonts';

const IOS_PADDING = 15;
export default StyleSheet.create({
  container: {
    backgroundColor: colors.bgPrimary,
    height: 65,
    paddingLeft: 40,
    paddingRight: 40,
  },
  logoWrapper: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {},
      ios: {
        paddingTop: IOS_PADDING,
      },
    }),
  },
  textLogo: {
    flexDirection: 'row',
  },
  logo: {
    height: 32,
    width: 32,
  },
  absoluteBtn: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    ...Platform.select({
      android: {},
      ios: {
        paddingTop: IOS_PADDING,
      },
    }),
  },
  leftButton: {
    left: 15,
  },
  rightButton: {
    right: 15,
  },
  button: {
    width: 30,
    height: 30,
  },
  headerText: {
    fontFamily: Fonts.fontFamily.AvenirLight,
    fontSize: Fonts.fontSize.h3,
    color: colors.basicHeaderTitle,
  },
  rightText: {
    fontFamily: Fonts.fontFamily.AvenirLight,
    fontSize: 16,
    color: colors.rightHeaderTitle,
  },
  disabledRightText: {
    color: colors.rightHeaderDisable,
  },
});
