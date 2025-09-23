// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';
import Fonts from '../../theme/Fonts';

export default StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    padding: 25,
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.fontFamily.AvenirMedium,
    color: colors.black,
  },
  boldTitle: {
    fontWeight: "700",
  },
});
