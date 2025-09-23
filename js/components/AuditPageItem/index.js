// // @flow

// import React, { Component } from 'react';
// import {
//   View,
//   Image,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import PropTypes from 'prop-types';
// import Styles from './Styles';
// import { images } from '../../common/appImages';

// class AuditPageItem extends Component {
//   static propTypes = {
//     title: PropTypes.string,
//     icon: PropTypes.string,
//     onPress: PropTypes.func,
//   }
//   render() {
//     const {
//       title,
//       icon,
//       onPress,
//     } = this.props;

//     return (
//       <TouchableOpacity
//         style={Styles.container}
//         onPress={() => onPress(this.props)}
//       >
//         <View style={Styles.textBlock}>
//           <Text style={Styles.title}>
//             {title}
//           </Text>
//         </View>
//         <View style={Styles.iconWrapper}>
//           <Image
//             source={icon ? images[icon] : images.nextGrey}
//             resizeMode="contain"
//             style={Styles.icon}
//           />
//         </View>
//       </TouchableOpacity>
//     );
//   }
// }


// AuditPageItem.defaultProps = {
//   title: '',
//   icon: '',
//   onPress: () => {},
// };

// export default AuditPageItem;


// @flow

import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { images } from '../../common/appImages';
import ProgressBar from '../ProgressBar';

class AuditPageItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    onPress: PropTypes.func,
    showProgressBar: PropTypes.bool,
    style: PropTypes.number,
    imageStyle: PropTypes.number,
    percents: PropTypes.number,
  }
  render() {
    const {
      title,
      icon,
      onPress,
      showProgressBar,
      style,
      imageStyle,
      percents,
    } = this.props;
    return (
      <TouchableOpacity
        style={[Styles.container, style]}
        onPress={() => onPress(this.props)}
      >
        <View style={Styles.infoBlock}>
          <View style={Styles.textBlock}>
            <Text style={Styles.title}>
              {title}
            </Text>
          </View>
          <View style={Styles.iconWrapper}>
            <Image
              source={icon ? images[icon] : images.nextGrey}
              resizeMode="contain"
              style={[Styles.icon, imageStyle]}
            />
          </View>
        </View>
        {showProgressBar &&
          <View style={Styles.progressBar}>
            <ProgressBar value={percents} />
          </View>
        }
      </TouchableOpacity>
    );
  }
}


AuditPageItem.defaultProps = {
  title: '',
  icon: '',
  onPress: () => {},
  showProgressBar: false,
  style: null,
  imageStyle: null,
  percents: 0,
};

export default AuditPageItem;
