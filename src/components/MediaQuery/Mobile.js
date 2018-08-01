import React from 'react';
import MediaQuery from 'react-responsive';

const Mobile = props => <MediaQuery {...props} maxWidth={767} />;

export default Mobile;