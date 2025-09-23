// @flow

import { StyleSheet } from 'react-native';
import { Fonts } from '../../theme';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  titleWrapper: {
    flex: 0.9,
  },
  headText: {
    lineHeight: 25,
    fontSize: Fonts.fontSize.h5,
    fontFamily: Fonts.fontFamily.AvenirLight,
    color: colors.charcolBlack,
  },
  checkboxWrapper: {
    paddingTop: 5,
    flex: 0.1,
    alignItems: 'flex-end',
  },
  actionImage: {
    width: 30,
    height: 30,
  },
});
