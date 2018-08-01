import React from 'react';
import MediaQuery from 'react-responsive';

const Desktop = props => <MediaQuery {...props} minWidth={768} />;

export default Desktop;