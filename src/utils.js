import React from 'react';

const utils = {};

utils.firstChildComponent = (component) => {
  const { children } = component.props;
  const arr = React.Children.toArray(children);
  return arr[0] || null;
};

export default utils;
