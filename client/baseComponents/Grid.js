import './style.scss'
import React from 'react'
function Grid({ hello }) {
  return (
    <div className="root">
      <h1 className="title">{hello}</h1>
    </div>
  )
}

export default Grid
