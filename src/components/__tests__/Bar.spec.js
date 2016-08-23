import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
const Bar = () => (
  <div className="Bar">
    <h2>Bar</h2>
  </div>
  )
test('has a .Bar class name', t => {
    const wrapper = shallow(<Bar/>);
    t.true(wrapper.hasClass('Bar'));
});
