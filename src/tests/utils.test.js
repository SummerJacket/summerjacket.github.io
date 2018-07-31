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
      const child = utils.getNthChild(component, 0);
      expect(shallow(child).type()).toEqual('span');
    });

    it('gets the second child component', () => {
      const component = (
        <div>
          <div />
          <span />
        </div>
      );
      const child = utils.getNthChild(component, 1);
      expect(shallow(child).type()).toEqual('span');
    });

    it("returns null when there's no child", () => {
      const child = utils.getNthChild(<div />, 0);
      expect(child).toBeNull();
    });
  });
});
