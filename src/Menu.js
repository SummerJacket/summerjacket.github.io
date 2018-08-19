import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';
import posed from 'react-pose';
import styled from 'styled-components';

import MenuItem from './MenuItem';

const menuHeight = 500;

const MenuWrapper = styled(
  posed.div({
    open: { staggerChildren: 80 },
    closed: { staggerChildren: 80, staggerDirection: -1 },
  })
)`
  width: 100%;
`;

const MenuBackground = styled(
  posed.div({
    open: {
      height: ({ startingheight }) => menuHeight + startingheight,
      transition: { type: 'spring', mass: 0.8 },
    },
    closed: {
      height: ({ startingheight }) => startingheight,
      transition: { ease: 'anticipate', duration: 600 },
    },
    props: { startingheight: 0 },
  })
)`
  position: fixed;
  width: inherit;
`;

const NavContainer = styled(
  posed.div({
    open: { staggerChildren: 80, delayChildren: 200 },
    closed: { staggerChildren: 80, staggerDirection: -1 },
  })
)`
  font-size: 40px;
  display: block;
  margin-left: 100px;
`;

const Menu = ({ isActive, style, ...rest }) => {
  const { zIndex = 'inherit' } = style;
  return (
    <MenuWrapper pose={isActive ? 'open' : 'closed'} style={style} {...rest}>
      <MenuBackground
        style={{ backgroundColor: 'var(--accent-color)', zIndex }}
        startingheight={3}
      />
      <MenuBackground
        style={{ backgroundColor: '#FFFF', zIndex }}
        startingheight={0}
      />
      <Row
        style={{
          position: 'fixed',
          width: '100%',
          height: menuHeight,
          pointerEvents: isActive ? 'auto' : 'none',
          zIndex,
        }}
      >
        <NavContainer className="align-self-center">
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/projects">Projects</MenuItem>
          <MenuItem to="/contact">Contact</MenuItem>
        </NavContainer>
      </Row>
    </MenuWrapper>
  );
};

Menu.propTypes = {
  isActive: PropTypes.bool.isRequired,
  style: PropTypes.shape({}),
};

Menu.defaultProps = {
  style: {},
};

export default Menu;
