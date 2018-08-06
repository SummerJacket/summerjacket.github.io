import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import Menu from './Menu';
import Home from './Home';
import Contact from './Contact';
import NotFound from './NotFound';
import './dist/hamburgers.min.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick() {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  render() {
    const { menuOpen } = this.state;
    return (
      <div>
        <Menu isActive={menuOpen} onClick={this.handleMenuClick} />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
