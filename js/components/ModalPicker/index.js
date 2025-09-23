// @flow

import React, { Component } from 'react';

import {
  View,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';

class ModalPicker extends Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    const {
      items,
      onPress,
      onClose,
    } = this.props;
    return (
      <Modal
        transparent
        visible
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={Styles.modalContainer}>
          <View style={Styles.block}>
            {
              items.map((item: {}) => {
                return (
                  <TouchableOpacity
                    key={`picker-item-${item.id}`}
                    onPress={() => onPress(item)}
                    style={Styles.content}
                  >
                    <Text style={Styles.text}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </View>
      </Modal>
    );
  }
}

ModalPicker.defaultProps = {
  items: [],
  onPress: () => {},
  onClose: () => {},
  show: false,
};

ModalPicker.propTypes = {
  items: PropTypes.array,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  show: PropTypes.bool,
};

export default ModalPicker;
