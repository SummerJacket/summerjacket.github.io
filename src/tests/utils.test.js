import React from 'react';
import { shallow } from 'enzyme';

import utils from '../utils';

describe('utils', () => {
  describe('firstChildComponent', () => {
    it('gets the first child component', () => {
      const component = (
        <div>
          <span />
          <div />
        </div>
      );
      const firstChild = utils.firstChildComponent(component);
      expect(shallow(firstChild).type()).toEqual('span');
    });

    it('returns null when there\'s no child', () => {
      const firstChild = utils.firstChildComponent(<div />);
      expect(firstChild).toBeNull();
    });
  });
});
