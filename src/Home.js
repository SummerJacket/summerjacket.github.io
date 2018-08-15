import React from 'react';
import { Row } from 'reactstrap';

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

const HomeNav = () => (
  <div style={{ fontSize: '1.5em' }}>
    <FancyLink to="/projects">PROJECTS</FancyLink>
    <span
      style={{
        paddingLeft: '1em',
        paddingRight: '1em',
        color: 'var(--accent-color)',
      }}
    >
      /
    </span>
    <FancyLink to="/contact">CONTACT</FancyLink>
  </div>
);

const Home = () => (
  <Row style={{ minHeight: '100vh', marginLeft: 'auto', marginRight: 'auto' }}>
    <div className="align-self-center">
      <Heading />
      <div style={{ marginTop: '4em' }} />
      <HomeNav />
    </div>
  </Row>
);

export default Home;
