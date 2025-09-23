// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';
import Fonts from '../../theme/Fonts';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0,
    borderBottomColor: colors.borderColor,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 10,
    alignItems: 'center',
  },
  titleWrapper: {
    flex: 0.9,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.fontFamily.AvenirLight,
    color: colors.black,
  },
  pointsBlock: {
    flex: 0.1,
  },
  bubbleRow: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flex: 1,
  },
  block: {
    minWidth: 45,
    marginLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
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
