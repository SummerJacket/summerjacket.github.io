import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import styled from 'styled-components';

const MenuItemWrapper = posed.div({
  open: { y: 0, opacity: 1, transition: { ease: 'backOut' } },
  closed: { y: -40, opacity: 0, transition: { ease: 'backOut' } },
});

const StyledLink = styled(Link)`
  padding-top: 15px;
  padding-bottom: 15px;
  display: block;
  color: var(--primary-color);
  &:hover {
    color: var(--primary-color);
    background-color: var(--tertiary-color);
    text-decoration: none;
  }
`;

const MenuItem = ({ to, children, ...rest }) => (
  <MenuItemWrapper {...rest}>
    <StyledLink to={to}>{children}</StyledLink>
  </MenuItemWrapper>
);

MenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default MenuItem;
