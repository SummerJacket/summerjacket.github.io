import React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';

import MenuButton from './MenuButton';

const transition = {
  ease: 'backOut',
  duration: 500,
};

const MenuBackground = styled(
  posed.div({
    open: { height: 400, transition },
    closed: { height: 4, transition },
  })
)`
  width: inherit;
`;

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
    };
    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
  }

  handleMenuButtonClick() {
    this.setState(prev => ({ menuOpen: !prev.menuOpen }));
  }

  render() {
    const { menuOpen } = this.state;
    return (
      <div>
        <MenuButton
          isActive={menuOpen}
          onClick={this.handleMenuButtonClick}
          style={{ zIndex: 1000 }}
        />
        <div style={{ position: 'fixed', width: '100%', zIndex: 900 }}>
          <MenuBackground
            pose={menuOpen ? 'open' : 'closed'}
            style={{ backgroundColor: '#FFF' }}
          />
          <MenuBackground
            pose={menuOpen ? 'open' : 'closed'}
            style={{ backgroundColor: 'var(--accent-color)' }}
          />
        </div>
      </div>
    );
  }
}

export default Menu;
