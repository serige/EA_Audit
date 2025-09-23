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
    fontSize: Fonts.fontSize.h4,
    color: colors.charcolBlack,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
