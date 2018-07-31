import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BoxShadow from './BoxShadow';

const size = 64;

const StyledMenuButton = styled(BoxShadow)`
  position: fixed;
  width: ${size}px;
  height: ${size}px;
  background: white;
`;

const MenuButton = ({ left }) => {
  const realLeft = left - size / 2;
  return <StyledMenuButton style={{ left: realLeft }} />;
};

MenuButton.propTypes = {
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MenuButton.defaultProps = {
  left: 0,
};

export default MenuButton;
