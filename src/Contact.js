import React from 'react';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';

import VerticalAligner from './VerticalAligner';

const ContactForm = () => (
  <Form action="">
    <Row>
      <Col>
        <FormGroup>
          <Input type="text" name="name" placeholder="Your Name" />
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Input type="email" name="email" placeholder="Email" />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <FormGroup>
          <Input
            type="textarea"
            name="message"
            placeholder="Your message..."
            rows="8"
          />
        </FormGroup>
      </Col>
    </Row>
    <Button outline color="primary">
      Submit
    </Button>
  </Form>
);

const Contact = () => (
  <VerticalAligner align="center">
    <h1>Let&apos;s talk</h1>
    <ContactForm />
  </VerticalAligner>
);

export default Contact;
