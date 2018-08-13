import React from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  font-family: var(--secondary-font);
  color: var(--primary-color);
  transition: 0.3s;
  letter-spacing: 3px;
  &:hover {
    color: #fff;
    background-color: var(--primary-color);
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
  <div style={{ fontSize: '1.5em' }}>
    <StyledLink to="/projects">PROJECTS</StyledLink>
    <span
      style={{
        paddingLeft: '1em',
        paddingRight: '1em',
        color: 'var(--accent-color)',
      }}
    >
      /
    </span>
    <StyledLink to="/contact">CONTACT</StyledLink>
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
