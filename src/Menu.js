import React from 'react';
import PropTypes from 'prop-types';

class Menu extends React.Component {
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
      <div style={{ position: 'fixed', marginTop: '2em', marginLeft: '2em' }}>
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

Menu.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Menu;
