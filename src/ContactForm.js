import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  border: none;
  border-radius: 0;
  border-bottom: 1px solid var(--secondary-color);
  &:focus {
    border-color: var(--accent-color);
    box-shadow: none;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 0;
`;

const ColInput = ({ colProps, ...props }) => (
  <Col {...colProps}>
    <FormGroup>
      <StyledInput {...props} />
    </FormGroup>
  </Col>
);

const ContactForm = () => (
  <Form action="https://formspree.io/jasonliang512@gmail.com" method="POST">
    <Row>
      <ColInput
        colProps={{ md: 12, lg: 6 }}
        type="text"
        name="name"
        placeholder="Your Name"
      />
      <ColInput
        colProps={{ md: 12, lg: 6 }}
        type="email"
        name="email"
        placeholder="Email"
      />
    </Row>
    <Row>
      <ColInput
        type="textarea"
        name="message"
        placeholder="Your message..."
        rows="4"
      />
    </Row>
    <StyledButton outline color="primary" type="submit">
      Submit
    </StyledButton>
  </Form>
);

ColInput.propTypes = {
  colProps: PropTypes.shape(Col.PropTypes),
};

ColInput.defaultProps = {
  colProps: {},
};

export default ContactForm;
