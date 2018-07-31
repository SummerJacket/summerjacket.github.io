import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { PoseGroup } from 'react-pose';

import Home from './Home';
import About from './About';
// import Wipe from './Wipe';

const Container = styled.div``;

const App = () => (
  <Container>
    {/* <Wipe /> */}
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <PoseGroup animateOnMount preEnterPose="before">
      <Route exact path="/" component={Home} key={1} />
      <Route path="/about" component={About} key={2} />
    </PoseGroup>
  </Container>
);

export default App;
