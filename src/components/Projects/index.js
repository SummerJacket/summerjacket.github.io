import React from 'react';
import { Row, Col } from 'reactstrap';

import childrenPropTypes from '../../childrenPropTypes';

const CustomCol = ({ children, ...rest }) => (
  <Col sm={12} md={6} lg={4} {...rest}>
    {children}
  </Col>
);

const Projects = () => (
  <Row>
    <CustomCol>Test1</CustomCol>
    <CustomCol>Test2</CustomCol>
    <CustomCol>Test3</CustomCol>
  </Row>
);

CustomCol.propTypes = {
  children: childrenPropTypes,
};

CustomCol.defaultProps = {
  children: '',
};

export default Projects;
