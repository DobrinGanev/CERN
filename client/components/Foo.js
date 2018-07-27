import React from 'react'
import PropTypes from 'prop-types'
const Foo = ({ children }) => (
  <div className="Foo">
    <h2>Foo</h2>
    {children}
  </div>
)

Foo.propTypes = {
  children: PropTypes.any
}
export default Foo
