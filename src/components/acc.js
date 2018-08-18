import React from 'react'
import { Line as LineChart } from 'react-chartjs-2'

import ChartCol from './chartcol.js'


const Acc = ({charts, devNames, colClass, handleClick}) => {
  let panels = Object.keys(charts).map((id, i) => {
    return (
      <ChartCol charts={charts[id]} devName={devNames[id]} colClass={colClass} handleClick={handleClick} key={i} />
    )
  });

  return (
    <div className="row">
        {panels}
    </div>
  );
}

export default Acc
