import React from 'react';
import { shallow } from 'enzyme';

import Wipe from '../components/Wipe';

describe('<Wipe />', () => {
  it('renders without crashing', () => {
    shallow(<Wipe />);
  });
});
