import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import styled from 'styled-components';

import BoxShadow from './BoxShadow';

const Hover = posed(BoxShadow)({
  idle: { scale: 1 },
  hover: { scale: 1.5 },
});

const StyledHover = styled(Hover)`
  width: 100px;
  height: 100px;
  display: inline-block;
  margin: 2em;
`;

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  render() {
    const { color } = this.props;
    const { hover } = this.state;
    return (
      <StyledHover
        pose={hover ? 'hover' : 'idle'}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        style={{ background: color }}
      />
    );
  }
}

Square.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Square;
