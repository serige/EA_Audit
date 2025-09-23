// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../common/appColors';
import Fonts from '../../theme/Fonts';

// export default StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: colors.borderColor,
//     padding: 10,
//     paddingLeft: 20,
//     paddingRight: 30,
//     minHeight: 120,
//   },
//   textBlock: {
//     justifyContent: 'center',
//     flex: 1,
//   },
//   title: {
//     fontSize: 18,
//     fontFamily: Fonts.fontFamily.AvenirMedium,
//     color: colors.black,
//   },
//   description: {
//     marginTop: 15,
//     fontSize: 18,
//     fontFamily: Fonts.fontFamily.AvenirMedium,
//     color: colors.assignmentDescription,
//   },
//   iconWrapper: {
//     justifyContent: 'center',
//   },
//   icon: {
//     width: 50,
//     height: 50,
//   },
// });


export default StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 30,
    minHeight: 120,
  },
  infoBlock: {
    flex: 1,
    flexDirection: 'row',
  },
  textBlock: {
    justifyContent: 'center',
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
    width: 50,
    height: 50,
  },
  progressBar: {
    flexDirection: 'row',
  },
});
