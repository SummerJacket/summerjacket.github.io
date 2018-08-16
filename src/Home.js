import React from 'react';
import styled from 'styled-components';

import VerticalAligner from './VerticalAligner';
import FancyLink from './FancyLink';

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

const HomeNav = () => (
  <div style={{ fontSize: '1.3em' }}>
    <FancyLink to="/projects">PROJECTS</FancyLink>
    <LinkSeparator>/</LinkSeparator>
    <FancyLink to="/contact">CONTACT</FancyLink>
  </div>
);

const Home = () => (
  <VerticalAligner align="center">
    <Heading />
    <div style={{ marginTop: '4em' }} />
    <HomeNav />
  </VerticalAligner>
);

export default Home;
