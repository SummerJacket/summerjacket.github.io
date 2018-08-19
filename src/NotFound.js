import React from 'react';
import { IoIosWarning } from 'react-icons/io';

import VerticalAligner from './VerticalAligner';

const NotFound = () => (
  <VerticalAligner align="center">
    <h1 style={{ display: 'inline-block' }}>
      <IoIosWarning style={{ verticalAlign: -7 }} />
      <span style={{ marginLeft: '16px' }} />
      Page not found
    </h1>
  </VerticalAligner>
);

export default NotFound;
