import React from 'react';
import { shallow } from 'enzyme';

import MenuButton from '../components/MenuButton';


describe('<MenuButtton />', () => {
  it('renders without crashing', () => {
    shallow(<MenuButton />);
  });

  it('changes state on click', () => {
    const renderedComponent = shallow(<MenuButton />);
    renderedComponent.simulate('mouseclick');
    expect(renderedComponent.state('open')).toBe(true);
  });
});
