// @flow

import { StyleSheet } from 'react-native';
import { Fonts } from '../../theme';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  headText: {
    lineHeight: 25,
    fontSize: Fonts.fontSize.h5,
    fontFamily: Fonts.fontFamily.AvenirLight,
    color: colors.charcolBlack,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 5,
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  actionImage: {
    width: 30,
    height: 30,
  },
  actionLabel: {
    paddingLeft: 15,
    fontSize: Fonts.fontSize.xxlg,
    color: colors.charcolBlack,
  },
  block: {
    height: 20,
    minWidth: 60,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleText: {
    fontSize: 10,
    fontFamily: Fonts.fontFamily.AvenirLight,
    color: colors.black,
  },
});
