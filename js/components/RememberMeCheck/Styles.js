// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 27,
    height: 27,
  },
  text: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.black,
  },
});
