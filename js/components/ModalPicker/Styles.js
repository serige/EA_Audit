// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    backgroundColor: colors.modalBackground,
  },
  block: {
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  content: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 25,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
  },
  buttonRow: {
    marginTop: 10,
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 25,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  button: {
    flex: 1,
  },
});
