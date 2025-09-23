// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {},
  textBlock: {
    justifyContent: 'center',
    paddingTop: 0,
  },
  evidenceInput: {
    borderBottomWidth: 0,
  },
  photoBtn: {
    padding: 0,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: 0,
  },
  plusIcon: {
    width: 20,
  },
  form: {
    paddingTop: 80,
    paddingLeft: 75,
    paddingRight: 75,
  },
  logo: {
    alignSelf: 'center',
    width: 300,
    height: 150,
    marginBottom: 75,
  },
  inputBlock: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 15,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 0,
    height: null,
  },
  title: {},
  input: {
    flex: 1,
    paddingTop: 0,
    fontSize: 16,
    marginTop: 10,
    height: 30,
  },
  forgotPass: {
    paddingLeft: 7,
    paddingTop: 10,
  },
  checkboxLoginRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
  },
  rememberMe: {},
  welcomeText: {
    textAlign: "center",
    fontFamily: "Georgia-Bold",
    color: colors.bgPrimary,
  },
  error: {
    textAlign: "center",
    fontFamily: "Georgia-Bold",
    color: colors.fail,
  },
});
