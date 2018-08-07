import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import Menu from './Menu';
import Home from './Home';
import Contact from './Contact';
import NotFound from './NotFound';

const App = () => (
  <div>
    <Menu />
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </div>
);

export default App;
