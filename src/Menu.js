import React from 'react';
import PropTypes from 'prop-types';
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
      height: ({ startingHeight }) => 500 + startingHeight,
      transition: backgroundTransition,
    },
    closed: {
      height: ({ startingHeight }) => startingHeight,
      transition: backgroundTransition,
    },
    props: { startingHeight: 0 },
  })
)`
  position: fixed;
  width: inherit;
`;

const Menu = ({ isActive }) => (
  <MenuWrapper
    pose={isActive ? 'open' : 'closed'}
    style={{ width: '100%', zIndex: 900 }}
  >
    <MenuBackground
      style={{ backgroundColor: 'var(--accent-color)' }}
      startingHeight={4}
    />
    <MenuBackground style={{ backgroundColor: '#FFF' }} startingHeight={0} />
  </MenuWrapper>
);

Menu.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default Menu;
