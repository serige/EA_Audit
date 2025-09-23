// @flow

import Colors from '../theme/Colors';

let colors = {
  ...Colors.sqf,
};

const setColors = (type: string) => {
  const list = (type && Colors[type]) ? Colors[type] : {};
  colors = {
    ...list,
  };
};

export {
  colors,
  setColors,
};
