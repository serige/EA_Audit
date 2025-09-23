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
  pendingActions: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
  buttonRow: {
    paddingTop: 40,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
