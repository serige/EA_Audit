// @flow

import Images from '../theme/ImagesPath';

let images = {
  ...Images.defaultImages,
};

const setImages = (type: string) => {
  const list = (type && Images[type]) ? Images[type] : {};
  images = {
    ...images,
    ...list,
  };
};

export {
  images,
  setImages,
};
