import React from 'react';
import { Link as UnstyledLink } from 'react-router-dom';
import { Row } from 'reactstrap';
import styled from 'styled-components';

const Link = styled(UnstyledLink)`
  font-family: 'Iosevka', sans-serif;
  color: #000;
  transition: 0.3s;
  &:hover {
    color: #fff;
    background-color: #000;
    text-decoration: none;
  }
`;

const Heading = () => (
  <div>
    <h1>Hey!</h1>
    <h1>
      I&apos;m <span style={{ color: 'var(--accent-color)' }}>Jason Liang</span>
    </h1>
    <h1 style={{ color: 'var(--secondary-color)' }}>I code things</h1>
  </div>
);

const HomeNav = () => (
  <div style={{ fontSize: '1.8em' }}>
    <Link to="/projects">Projects</Link>
    <span
      style={{
        paddingLeft: '1em',
        paddingRight: '1em',
        color: 'var(--accent-color)',
      }}
    >
      /
    </span>
    <Link to="/contact">Contact</Link>
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
