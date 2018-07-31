import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { PoseGroup } from 'react-pose';

import Home from './Home';
import About from './About';
import Sidebar from './Sidebar';
// import Wipe from './Wipe';

const Container = styled.div`
  color: rgba(255, 255, 255, 0.95);
  background: #15303d;
  min-height: 100vh;
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div``;

const App = () => (
  <Container>
    {/* <Wipe /> */}
    <Row>
      <Column style={{ width: 100 }}>
        <Sidebar />
      </Column>
      <Column style={{ padding: '8em' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <PoseGroup animateOnMount preEnterPose="before">
          <Route exact path="/" component={Home} key={1} />
          <Route path="/about" component={About} key={2} />
        </PoseGroup>
      </Column>
    </Row>
  </Container>
);

export default App;
