import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import '../../lib/hamburgers.min.css';

const ButtonWrapper = styled.div`
  position: fixed;
  margin-top: 2em;
  margin-left: 2em;
  transform: scale(0.75);
`;

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
    const { isActive, onClick, style, ...rest } = this.props;
    return (
      <ButtonWrapper style={style} {...rest}>
        <button
          className={`hamburger hamburger--spin ${isActive ? 'is-active' : ''}`}
          onClick={this.handleButtonClick}
          style={{ outline: 'none' }}
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </ButtonWrapper>
    );
  }
}

MenuButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
};

MenuButton.defaultProps = {
  style: {},
};

export default MenuButton;
