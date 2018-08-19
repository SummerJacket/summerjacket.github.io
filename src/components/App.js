import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import Menu from './Menu';
import Home from './Home';
import Contact from './Contact';
import Projects from './Projects';
import NotFound from './NotFound';

const App = () => (
  <BrowserRouter>
    <div>
      <Menu />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/projects" component={Projects} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  </BrowserRouter>
);

export default App;
