import React from 'react';

const utils = {};

utils.firstChildComponent = ({ Children }) => {
  const arr = React.Children.toArray(Children);
  return arr[0] || null;
};

export default utils;
