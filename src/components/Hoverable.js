import React from 'react';
import posed from 'react-pose';

import childrenPropTypes from '../childrenPropTypes';

const Wrapper = posed.div({});

class Hoverable extends React.Component {
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
    const { children, ...rest } = this.props;
    return (
      <Wrapper
        pose={hovering ? 'hover' : 'idle'}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...rest}
      >
        {children}
      </Wrapper>
    );
  }
}

Hoverable.propTypes = {
  children: childrenPropTypes,
};

Hoverable.defaultProps = {
  children: '',
};

export default Hoverable;
