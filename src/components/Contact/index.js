import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { IoMdMail, IoLogoGithub } from 'react-icons/io';

import childrenPropTypes from '../../childrenPropTypes';
import { Mobile, Default } from '../../mediaDevices';
import FancyHoverText from '../FancyHoverText';
import VerticalAligner from '../VerticalAligner';
import ContactForm from './ContactForm';

const iconStyle = {
  verticalAlign: -4,
};

const CustomRow = ({ children }) => (
  <div>
    <Default>
      <Row>{children}</Row>
    </Default>
    <Mobile>
      <Row style={{ paddingTop: 50, paddingBottom: 100 }}>{children}</Row>
    </Mobile>
  </div>
);

const CustomCol = ({ children, ...rest }) => (
  <Col sm={12} md={6} {...rest}>
    <Default>
      <VerticalAligner align="center">{children}</VerticalAligner>
    </Default>
    <Mobile style={{ marginTop: 50 }}>{children}</Mobile>
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
  <CustomRow>
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
  </CustomRow>
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

CustomRow.propTypes = {
  children: childrenPropTypes,
};

CustomRow.defaultProps = {
  children: '',
};

CustomCol.propTypes = {
  children: childrenPropTypes,
};

CustomCol.defaultProps = {
  children: '',
};

export default Contact;
