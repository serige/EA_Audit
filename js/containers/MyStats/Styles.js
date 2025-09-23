// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  graphBlock: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  text: {
    color: colors.graphText,
    fontSize: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  percentageImg: {
    width: 200,
    height: 200,
  },
});
