import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import Home from './Home';
import Contact from './Contact';

const App = () => (
  <BrowserRouter>
    <Container>
      <Route exact path="/" component={Home} />
      <Route path="/contact" component={Contact} />
    </Container>
  </BrowserRouter>
);
export default App;
