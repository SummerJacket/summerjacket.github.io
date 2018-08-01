import React from 'react';
import MediaQuery from 'react-responsive';

const Desktop = props => <MediaQuery {...props} minWidth={992} />;

export default Desktop;