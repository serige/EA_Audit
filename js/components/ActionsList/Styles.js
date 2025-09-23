// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';
import Fonts from '../../theme/Fonts';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 30,
  },
  rowText: {
    fontSize: 20,
    fontFamily: Fonts.fontFamily.AvenirLight,
    backgroundColor: 'transparent',
    color: colors.black,
    padding: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
  counterWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 15,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.fail,
  },
  counterText: {
    marginTop: 3,
    fontFamily: Fonts.fontFamily.AvenirLight,
    color: colors.white,
    fontSize: 13,
  },
});
