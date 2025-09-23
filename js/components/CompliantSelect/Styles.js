// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';
import Fonts from '../../theme/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    minHeight: 120,
  },
  textBlock: {
    paddingTop: 15,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.fontFamily.AvenirMedium,
    color: colors.black,
  },
  description: {
    marginTop: 15,
    fontSize: 18,
    fontFamily: Fonts.fontFamily.AvenirMedium,
    color: colors.assignmentDescription,
  },
  iconWrapper: {
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  infoBlock: {
    flexDirection: 'row',
    flex: 1,
  },
  progressBar: {
    flexDirection: 'row',
    flex: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  block: {
    minWidth: 60,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleText: {
    fontSize: 8,
    fontFamily: Fonts.fontFamily.AvenirLight,
    color: colors.black,
  },
});
