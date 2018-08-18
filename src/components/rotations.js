import React from 'react'
import { Line as LineChart } from 'react-chartjs-2'

import ChartCol from './chartcol.js'


const Rotations = ({charts, devNames, colClass, handleClick}) => {
  return (
    <div className="row">
      <ChartCol charts={charts} devName={devNames} colClass={colClass} handleClick={handleClick} />
    </div>
  );
}

export default Rotations
