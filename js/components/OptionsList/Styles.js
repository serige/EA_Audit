// @flow

import { StyleSheet } from 'react-native';
import { Fonts } from '../../theme';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    paddingVertical: 10,
  },
  rowText: {
    fontSize: Fonts.fontSize.h5,
    color: colors.charcolBlack,
    padding: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
});
