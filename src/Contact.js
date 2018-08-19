import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { IoMdMail, IoLogoGithub } from 'react-icons/io';

import childrenPropTypes from './childrenPropTypes';
import { Mobile, Default } from './mediaDevices';
import ContactForm from './ContactForm';
import FancyHoverText from './FancyHoverText';
import VerticalAligner from './VerticalAligner';

const iconStyle = {
  verticalAlign: -4,
};

const CustomCol = ({ children, ...rest }) => (
  <Col sm={12} md={6} {...rest}>
    <Default>
      <VerticalAligner align="center">{children}</VerticalAligner>
    </Default>
    <Mobile style={{ marginTop: 100 }}>{children}</Mobile>
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
    <CustomCol>
      <h1>Let&apos;s talk</h1>
      <div style={{ marginTop: '2.5em' }} />
      <ContactForm />
    </CustomCol>
    <CustomCol style={{ fontSize: '1.3em' }}>
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
    </CustomCol>
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

CustomCol.propTypes = {
  children: childrenPropTypes,
};

CustomCol.defaultProps = {
  children: '',
};

export default Contact;
