import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import posed from 'react-pose';
import styled from 'styled-components';

import stripes from '../../images/stripes.png';
import childrenPropTypes from '../../childrenPropTypes';
import Hoverable from '../Hoverable';

const Fill = styled(
  posed.div({
    hover: { height: '100%', skewY: 0 },
    idle: { height: 0, skewY: 45 },
  })
)`
  transform-origin: right bottom;
`;

const Project = ({ children, image, ...rest }) => (
  <Col sm={12} md={6} lg={4} {...rest}>
    <Hoverable>
      <div style={{ marginTop: '100%' }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundImage: image,
        }}
      >
        <Fill style={{ backgroundColor: 'red' }} />
        <div style={{ position: 'absolute', top: 0 }}>{children}</div>
      </div>
    </Hoverable>
  </Col>
);

Project.propTypes = {
  children: childrenPropTypes,
  image: PropTypes.string,
};

Project.defaultProps = {
  children: '',
  image: `url(${stripes})`,
};

export default Project;
