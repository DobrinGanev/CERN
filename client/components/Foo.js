import React from 'react'
const Foo = ({children}) =>
    <div className="Foo">
      <h2>Foo</h2>
      {children}
    </div>;

Foo.propTypes = {
    children: React.PropTypes.any
};
export default Foo;
