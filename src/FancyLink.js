import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import posed from 'react-pose';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  font-family: var(--secondary-font);
  color: var(--primary-color);
  transition: 0.3s;
  letter-spacing: 3px;
  &:hover {
    color: var(--primary-background-color);
    text-decoration: none;
  }
`;

const Fill = styled(
  posed.span({
    hover: {
      scaleY: 1,
      opacity: 1,
    },
    idle: {
      scaleY: 0,
      opacity: 0,
    },
  })
)`
  background-color: var(--primary-color);
  width: 100%;
  height: 100%;
  top: 0px;
  position: absolute;
  transform-origin: left center;
  z-index: -1;
`;

class FancyLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hovering: true });
  }

  handleMouseLeave() {
    this.setState({ hovering: false });
  }

  render() {
    const { hovering } = this.state;
    const { to, children, ...rest } = this.props;
    return (
      <StyledLink
        to={to}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...rest}
      >
        <span style={{ position: 'relative', zIndex: -1 }}>
          <Fill className="helloworld" pose={hovering ? 'hover' : 'idle'} />
          {children}
        </span>
      </StyledLink>
    );
  }
}

FancyLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default FancyLink;
