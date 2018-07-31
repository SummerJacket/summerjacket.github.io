import React from 'react';

const utils = {};

utils.getNthChild = (component, n) => {
  const { children } = component.props;
  const arr = React.Children.toArray(children);
  return arr[n] || null;
};

export default utils;
