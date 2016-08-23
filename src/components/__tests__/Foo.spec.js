import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
const Foo = ({children}) =>
    <div className="Foo">
      <h2>Foo</h2>
      {children}
    </div>;

Foo.propTypes = {
    children: React.PropTypes.any
};
test('has a .Foo class name', t => {
    const wrapper = shallow(<Foo/>);
    t.true(wrapper.hasClass('Foo'));
});
