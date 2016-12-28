import React from 'react'
import './style.scss';
function Grid({hello}) {
  return (
    <div className='root'>
      <h1 className='title'>{hello}</h1>
    </div>
  )
}

export default Grid;
