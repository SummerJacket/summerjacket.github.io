import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';
import posed from 'react-pose';
import styled from 'styled-components';

import MenuItem from './MenuItem';

const menuHeight = 500;

const MenuWrapper = posed.div({
  open: { staggerChildren: 80 },
  closed: { staggerChildren: 80, staggerDirection: -1 },
});

const MenuBackground = styled(
  posed.div({
    open: {
      height: ({ startingheight }) => menuHeight + startingheight,
      transition: { ease: 'anticipate', duration: 700 },
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
    open: { staggerChildren: 100, delayChildren: 300 },
    closed: { staggerChildren: 80, staggerDirection: -1 },
  })
)`
  display: block;
  margin-left: 100px;
`;

const Menu = ({ isActive }) => (
  <MenuWrapper
    pose={isActive ? 'open' : 'closed'}
    style={{ width: '100%', zIndex: 900 }}
  >
    <MenuBackground
      style={{ backgroundColor: 'var(--accent-color)' }}
      startingheight={3}
    />
    <MenuBackground style={{ backgroundColor: '#FFFF' }} startingheight={0} />
    <Row
      style={{
        position: 'fixed',
        width: '100%',
        height: menuHeight,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <NavContainer className="align-self-center" style={{ fontSize: '40px' }}>
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/projects">Projects</MenuItem>
        <MenuItem to="/contact">Contact</MenuItem>
      </NavContainer>
    </Row>
  </MenuWrapper>
);

Menu.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default Menu;
