import './style.scss'
import React from 'react'
import PropTypes from 'prop-types'
const Grid = ({ hello }) => {
  return (
    <div className="root">
      <h1 className="title">{hello}</h1>
    </div>
  )
}
Grid.propTypes = {
  hello: PropTypes.string.isRequired
}


export default Grid
