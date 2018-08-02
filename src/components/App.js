import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { PoseGroup } from 'react-pose';
// import { Container } from 'reactstrap';

import Home from './Pages/Home';
import About from './Pages/About';
import Sidebar from './Sidebar';
import Row from './Row';
import Column from './Column';
// import Wipe from './Wipe';

const Container = styled.div`
  /* color: rgba(255, 255, 255, 0.95); */
  color: rgba(0, 0, 0, 0.95);
  /* background: #15303d; */
  min-height: 100vh;
`;

const sideSize = 100;

const App = () => (
  <Container>
    {/* <Wipe /> */}
    <Row>
      <Column style={{ width: sideSize }}>
        <Sidebar left={sideSize}/>
      </Column>
      <Column style={{ padding: '8em' }}>
        <Link to="/">Home</Link>
        <span style={{ marginLeft: 20 }} />
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
