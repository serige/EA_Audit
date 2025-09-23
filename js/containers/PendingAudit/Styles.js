// @flow

import { StyleSheet } from 'react-native';
import { Fonts } from '../../theme';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    paddingTop: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    color: colors.black,
    fontFamily: Fonts.fontFamily.AvenirLight,
  },
  date: {
    marginTop: 5,
    fontSize: 18,
    color: colors.borderColor,
    fontFamily: Fonts.fontFamily.AvenirLight,
  },
  modulesList: {
    paddingTop: 15,
  },
  moduleTitle: {
    marginTop: 15,
    fontSize: 18,
    color: colors.black,
    fontFamily: Fonts.fontFamily.AvenirLight,
  },
  buttonRow: {
    paddingTop: 110,
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 60,
    justifyContent: 'space-between',
  },
});
