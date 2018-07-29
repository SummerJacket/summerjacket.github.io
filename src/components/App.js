import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import Home from './Home';
import About from './About';
import Wipe from './Wipe';

const Container = styled.div`
  padding: 6em;
`;

const App = () => (
  <Router>
    <div className="App">
      <Wipe />
      <Container>
        <Link to="/">
          Home
        </Link>
        <Link to="/about">
          About
        </Link>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Container>
    </div>
  </Router>
);

export default App;
