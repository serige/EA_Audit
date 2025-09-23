// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';
import Fonts from '../../theme/Fonts';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 10,
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.fontFamily.AvenirLight,
    color: colors.black,
  },
  pointsBlock: {
    flex: 1,
  },
  bubbleRow: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
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
