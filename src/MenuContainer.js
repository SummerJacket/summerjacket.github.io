import React from 'react';

import MenuButton from './MenuButton';
import Menu from './Menu';

class MenuContainer extends React.Component {
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
        <Menu isActive={menuOpen} />
      </div>
    );
  }
}

export default MenuContainer;
