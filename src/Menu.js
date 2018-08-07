import React from 'react';

import MenuButton from './MenuButton';

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
        <MenuButton isActive={menuOpen} onClick={this.handleMenuButtonClick} />
      </div>
    );
  }
}

export default Menu;
