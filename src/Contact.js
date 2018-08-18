import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import ContactForm from './ContactForm';
import VerticalAligner from './VerticalAligner';

const CenteredCol = ({ children, ...rest }) => (
  <Col {...rest}>
    <VerticalAligner align="center">{children}</VerticalAligner>
  </Col>
);

const Contact = () => (
  <Row>
    <CenteredCol sm="12" md="6">
      <h1>Let&apos;s talk</h1>
      <div style={{ marginTop: '2.5em' }} />
      <ContactForm />
    </CenteredCol>
    <CenteredCol sm="12" md="6">
      <h1>foo bar baz</h1>
    </CenteredCol>
  </Row>
);

CenteredCol.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

CenteredCol.defaultProps = {
  children: '',
};

export default Contact;
