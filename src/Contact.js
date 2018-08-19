import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { IoMdMail, IoLogoGithub } from 'react-icons/io';

import childrenPropTypes from './childrenPropTypes';
import ContactForm from './ContactForm';
import FancyHoverText from './FancyHoverText';
import VerticalAligner from './VerticalAligner';

const iconStyle = {
  verticalAlign: -4,
};

const CenteredCol = ({ children, ...rest }) => (
  <Col {...rest}>
    <VerticalAligner align="center">{children}</VerticalAligner>
  </Col>
);

const SocialLink = ({ icon, href, children, ...rest }) => (
  <div {...rest}>
    {icon}
    <span style={{ marginLeft: 12 }} />
    <a href={href} style={{ textDecoration: 'none' }}>
      <FancyHoverText>{children}</FancyHoverText>
    </a>
  </div>
);

const Contact = () => (
  <Row>
    <CenteredCol sm="12" md="6">
      <h1>Let&apos;s talk</h1>
      <div style={{ marginTop: '2.5em' }} />
      <ContactForm />
    </CenteredCol>
    <CenteredCol sm="12" md="6" style={{ fontSize: '1.3em' }}>
      <SocialLink
        icon={<IoMdMail style={iconStyle} />}
        href="mailto:jasonliang512@gmail.com"
      >
        jasonliang512@gmail.com
      </SocialLink>
      <SocialLink
        icon={<IoLogoGithub style={iconStyle} />}
        href="https://github.com/SummerJacket"
      >
        SummerJacket
      </SocialLink>
    </CenteredCol>
  </Row>
);

SocialLink.propTypes = {
  icon: PropTypes.element.isRequired,
  href: PropTypes.string,
  children: childrenPropTypes,
};

SocialLink.defaultProps = {
  href: '',
  children: '',
};

CenteredCol.propTypes = {
  children: childrenPropTypes,
};

CenteredCol.defaultProps = {
  children: '',
};

export default Contact;
