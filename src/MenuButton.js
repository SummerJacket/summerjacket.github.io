import React from 'react';
import PropTypes from 'prop-types';

import './dist/hamburgers.min.css';

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    const { onClick } = this.props;
    onClick();
  }

  render() {
    const { isActive } = this.props;
    return (
      <div
        style={{
          position: 'fixed',
          marginTop: '2em',
          marginLeft: '2em',
          transform: 'scale(0.8)',
        }}
      >
        <button
          className={`hamburger hamburger--spin ${
            isActive ? 'is-active' : null
          }`}
          onClick={this.handleButtonClick}
          style={{ outline: 'none' }}
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </div>
    );
  }
}

MenuButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuButton;
