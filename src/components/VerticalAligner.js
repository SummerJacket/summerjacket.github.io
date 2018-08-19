import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';

const VerticalAligner = ({ align, children, ...rest }) => (
  <Row
    style={{ minHeight: '100vh', marginLeft: 'auto', marginRight: 'auto' }}
    {...rest}
  >
    <div className={`align-self-${align}`}>{children}</div>
  </Row>
);

VerticalAligner.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

VerticalAligner.defaultProps = {
  children: '',
};

export default VerticalAligner;
