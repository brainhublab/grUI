import React from 'react'
import { Line as LineChart } from 'react-chartjs-2'

import ChartCol from './chartcol.js'


const Acc = ({charts, devNames, handleClick}) => {
  let panels = Object.keys(charts).map((id, i) => {
    return (
      <ChartCol charts={charts[id]} devName={devNames[id]} handleClick={handleClick} key={i} />
    )
  });

  return (
    <div className="row">
        {panels}
    </div>
  );
}

export default Acc
