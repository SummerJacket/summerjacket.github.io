import React from 'react';
import { shallow } from 'enzyme';

import Column from '../components/Column';

describe('<Column />', () => {
  it('renders without crashing', () => {
    shallow(<Column />);
  });
});
