import React from 'react';
import MediaQuery from 'react-responsive';

const Tablet = props => <MediaQuery {...props} minWidth={768} maxWidth={991} />;

export default Tablet;