import React from 'react';
import posed from 'react-pose';

import MenuButton from './MenuButton';

const transition = {
  default: { ease: 'backOut', duration: 500 },
};

const MenuBackground = posed.div({
  open: { height: 400, transition },
  closed: { height: 4, transition },
});

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
        <div style={{ position: 'fixed', width: '100%', zIndex: 500 }}>
          <div style={{ backgroundColor: '#FFF', width: 'inherit' }} />
          <MenuBackground
            pose={menuOpen ? 'open' : 'closed'}
            style={{
              backgroundColor: 'var(--accent-color)',
              width: 'inherit',
            }}
          />
        </div>
      </div>
    );
  }
}

export default Menu;
