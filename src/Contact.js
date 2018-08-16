import React from 'react';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import styled from 'styled-components';

import VerticalAligner from './VerticalAligner';

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

const ContactForm = () => (
  <Form action="https://formspree.io/jasonliang512@gmail.com" method="POST">
    <Row>
      <Col>
        <FormGroup>
          <StyledInput type="text" name="name" placeholder="Your Name" />
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <StyledInput type="email" name="email" placeholder="Email" />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <FormGroup>
          <StyledInput
            type="textarea"
            name="message"
            placeholder="Your message..."
          />
        </FormGroup>
      </Col>
    </Row>
    <StyledButton outline color="primary" type="submit">
      Submit
    </StyledButton>
  </Form>
);

const Contact = () => (
  <VerticalAligner align="center">
    <h1>Let&apos;s talk</h1>
    <ContactForm />
  </VerticalAligner>
);

export default Contact;
