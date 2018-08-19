import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import VerticalAligner from './VerticalAligner';
import FancyHoverText from './FancyHoverText';

const Heading = () => (
  <div>
    <h1>Hey!</h1>
    <h1>
      I&apos;m <span style={{ color: 'var(--accent-color)' }}>Jason Liang</span>
    </h1>
    <div style={{ marginTop: '1.5em' }} />
    <h1 style={{ color: 'var(--secondary-color)' }}>I code things</h1>
  </div>
);

const LinkSeparator = styled.span`
  padding-left: 1em;
  padding-right: 1em;
  color: var(--accent-color);
`;

const FancyLink = ({ to, children, ...props }) => (
  <Link to={to} {...props} style={{ textDecoration: 'none' }}>
    <FancyHoverText>{children}</FancyHoverText>
  </Link>
);

const HomeNav = () => (
  <div style={{ fontSize: '1.3em' }}>
    <FancyLink to="/projects">Projects</FancyLink>
    <LinkSeparator>/</LinkSeparator>
    <FancyLink to="/contact">Contact</FancyLink>
  </div>
);

const Home = () => (
  <VerticalAligner align="center">
    <Heading />
    <div style={{ marginTop: '4em' }} />
    <HomeNav />
  </VerticalAligner>
);

FancyLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string,
};

FancyLink.defaultProps = {
  children: '',
};

export default Home;
