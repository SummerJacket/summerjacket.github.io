import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import styled from 'styled-components';

import Hoverable from './Hoverable';

const spacing = '2.5px';

const Wrapper = styled.span`
  font-family: var(--secondary-font);
  color: var(--primary-color);
  transition: 0.3s;
  letter-spacing: ${spacing};
  &:hover {
    color: var(--primary-background-color);
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
  width: calc(100% - ${spacing});
  height: 100%;
  top: 0px;
  position: absolute;
  transform-origin: left center;
  z-index: -1;
`;

const FancyHoverText = ({ children, ...rest }) => (
  <Hoverable style={{ display: 'inline-block' }} {...rest}>
    <Wrapper>
      <span style={{ position: 'relative', zIndex: -1 }}>
        <Fill className="helloworld" />
        {children}
      </span>
    </Wrapper>
  </Hoverable>
);

FancyHoverText.propTypes = {
  children: PropTypes.string,
};

FancyHoverText.defaultProps = {
  children: '',
};

export default FancyHoverText;
