import React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';

import MenuButton from './MenuButton';
import Menu from './Menu';

const Overlay = styled(
  posed.div({ default: { opacity: 0 }, open: { opacity: 0.5 } })
)`
  position: fixed;
  background-color: #000;
  width: 100%;
  height: 100%;
`;

class MenuContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
    };
    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  handleMenuButtonClick() {
    this.setState(prev => ({ menuOpen: !prev.menuOpen }));
  }

  handleOverlayClick() {
    this.setState({ menuOpen: false });
  }

  render() {
    const { menuOpen } = this.state;
    return (
      <div>
        <MenuButton
          isActive={menuOpen}
          onClick={this.handleMenuButtonClick}
          style={{ zIndex: 10 }}
        />
        <Overlay
          pose={menuOpen ? 'open' : 'default'}
          onClick={this.handleOverlayClick}
          style={{ pointerEvents: menuOpen ? 'auto' : 'none', zIndex: 1 }}
        />
        <Menu isActive={menuOpen} style={{ zIndex: 9 }} />
      </div>
    );
  }
}

export default MenuContainer;
