import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
const Home = () => (
  <div className="Home">
    <h2 >Home</h2>
  </div>
  )
test('has a .Home class name', t => {
    const wrapper = shallow(<Home/>);
    t.true(wrapper.hasClass('Home'));
});
