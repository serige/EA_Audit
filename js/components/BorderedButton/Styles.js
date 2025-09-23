// @flow

import { StyleSheet } from 'react-native';
import { Fonts } from '../../theme';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 19,
  },
  buttonText: {
    fontFamily: Fonts.fontFamily.AvenirLight,
  },
});
