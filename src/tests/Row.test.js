import React from 'react';
import { shallow } from 'enzyme';

import Row from '../components/Row';

describe('<Row />', () => {
  it('renders without crashing', () => {
    shallow(<Row />);
  });
});
