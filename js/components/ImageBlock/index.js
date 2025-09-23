// @flow

import React, { Component } from 'react';

import {
  Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');
const maxWidth = width - 40;

class ImageBlock extends Component {
  constructor(props: {}) {
    super(props);
    const res = Image.resolveAssetSource(this.props.url);

    this.state = {
      width: res.width,
      height: res.height,
    };
  }

  render() {
    const {
      style,
      url,
    } = this.props;
    const height = this.state.height * (maxWidth / this.state.width);
    return (
      <Image
        style={[{ width: maxWidth, height }, style]}
        source={url}
      />
    );
  }
}

ImageBlock.propTypes = {
  url: PropTypes.number,
  style: PropTypes.number,
};

ImageBlock.defaultProps = {
  url: null,
  style: null,
};

export default ImageBlock;
