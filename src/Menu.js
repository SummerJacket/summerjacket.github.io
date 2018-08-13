import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import posed from 'react-pose';
import styled from 'styled-components';

const MenuWrapper = posed.div({
  open: { staggerChildren: 80 },
  closed: { staggerChildren: 80, staggerDirection: -1 },
});

const backgroundTransition = {
  ease: 'anticipate',
  duration: 700,
};

const MenuBackground = styled(
  posed.div({
    open: {
      height: ({ startingheight }) => 500 + startingheight,
      transition: backgroundTransition,
    },
    closed: {
      height: ({ startingheight }) => startingheight,
      transition: backgroundTransition,
    },
    props: { startingheight: 0 },
  })
)`
  position: fixed;
  width: inherit;
`;

const NavContainer = styled(
  posed.div({
    open: { opacity: 1 },
    closed: { opacity: 1 },
  })
)`
  margin-left: 150px;
`;

const NavLink = styled(Link)`
  margin-bottom: 50px;
  display: block;
  font-size: 36px;
  color: var(--primary-color);
  &:hover {
    color: var(--primary-color);
    background-color: var(--tertiary-color);
    text-decoration: none;
  }
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
    <MenuBackground style={{ backgroundColor: '#FFFF' }} startingheight={0}>
      <NavContainer>
        <div style={{ marginTop: 120 }} />
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavContainer>
    </MenuBackground>
  </MenuWrapper>
);

Menu.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default Menu;
