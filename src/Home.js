import React from 'react';
import { Link as UnstyledLink } from 'react-router-dom';
import { Row } from 'reactstrap';
import styled from 'styled-components';

const Link = styled(UnstyledLink)`
  font-family: 'Iosevka', sans-serif;
  color: #000;
  &:hover {
    color: #000;
  }
`;

const Heading = () => (
  <div>
    <h1>Hey!</h1>
    <h1>
      I&apos;m
      <span className="accent"> Jason Liang</span>
    </h1>
    <h1 className="secondary">I code things</h1>
  </div>
);

const Links = () => (
  <div style={{ fontSize: '1.8em' }}>
    <Link to="/projects">Projects</Link>
    <span
      className="accent"
      style={{ paddingLeft: '1em', paddingRight: '1em' }}
    >
      /
    </span>
    <Link to="/contact">Contact</Link>
  </div>
);

const Home = () => (
  <Row style={{ minHeight: '100vh' }}>
    <div className="align-self-center">
      <Heading />
      <div style={{ marginTop: '4em' }} />
      <Links />
    </div>
  </Row>
);

export default Home;
