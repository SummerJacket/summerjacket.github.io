import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';

const VerticalAligner = ({ align, children, ...rest }) => (
  <Row style={{ minHeight: '100vh', marginLeft: 'auto', marginRight: 'auto' }}>
    <div className={`align-self-${align}`} {...rest}>
      {children}
    </div>
  </Row>
);

VerticalAligner.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']).isRequired,
  children: PropTypes.element.isRequired,
};

export default VerticalAligner;
