import React from 'react';
import {
  Route,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Home from './Home';
import About from './About';
import Wipe from './Wipe';

const Container = styled.div`
`;

const App = withRouter(({ location }) => (
  <Container>
    <Wipe />
    <Link to="/">
      Home
    </Link>
    <Link to="/about">
      About
    </Link>
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={1000}
      >
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  </Container>
));

export default App;
