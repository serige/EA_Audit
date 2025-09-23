// @flow

import { StyleSheet } from 'react-native';
import { Fonts } from '../../theme';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {},
  peopleTitleBlock: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  facilityTitleBlock: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
  },
  peopleTitle: {
    fontSize: 18,
    color: colors.black,
    fontFamily: Fonts.fontFamily.AvenirLight,
  },
  peopleRow: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
  },
  peopleText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: Fonts.fontFamily.AvenirLight,
  },
  peopleButtonRow: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  buttonRow: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingHorizontal: 40,
    paddingTop: 5,
    paddingBottom: 5,
  },
  input: {
    minHeight: 0,
    paddingTop: 0,
    paddingBottom: 5,
    borderBottomWidth: 0,
  },
});
