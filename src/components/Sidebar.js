import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MenuButton from './MenuButton';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  height: 100vh;
  background: #15303d;
`;

const Sidebar = ({ left }) => (
  <Wrapper style={{ width: left }}>
    <MenuButton left={left} />
  </Wrapper>
);

Sidebar.propTypes = {
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Sidebar.defaultProps = {
  left: 100,
};

export default Sidebar;
