import React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';

const PosedRevel = posed.div({
  start: { height: window.innerHeight },
  end: {
    height: 0,
    transition: {
      ease: 'anticipate',
      duration: 1500,
    },
  },
});

const StyledRevel = styled(PosedRevel)`
  position: fixed;
  width: ${window.innerWidth}px;
  background: #dddddd;
`;

const Revel = () => (
  <StyledRevel pose="end" initialPose="start" />
);

export default Revel;
