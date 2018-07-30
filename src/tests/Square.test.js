import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Square from '../components/Square';

const renderComponent = () => shallow(<Square color="red" />);

describe('<Square />', () => {
  it('renders without crashing', () => {
    renderComponent();
  });

  it('requires a color prop', () => {
    const stub = sinon.stub(console, 'error');
    shallow(<Square />);
    expect(stub.calledOnce).toEqual(true);

    console.error.restore();
  });

  it('the default hover state should be false', () => {
    expect(renderComponent().state('hover')).toBe(false);
  });

  it('should change state on mouse enter', () => {
    const renderedComponent = renderComponent();
    renderedComponent.simulate('mouseenter');
    expect(renderedComponent.state('hover')).toBe(true);
  });

  it('should change back to default state on mouse leave', () => {
    const renderedComponent = renderComponent();
    renderedComponent.simulate('mouseenter');
    renderedComponent.simulate('mouseleave');
    expect(renderedComponent.state('hover')).toBe(false);
  });
});
