// @flow

import { StyleSheet } from 'react-native';
import { Fonts } from '../../theme';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  headText: {
    lineHeight: 30,
    fontSize: Fonts.fontSize.h5,
    fontFamily: Fonts.fontFamily.AvenirLight,
    color: colors.charcolBlack,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
});
