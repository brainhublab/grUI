import React from 'react'

import ChartPanel from './chartpanel.js'

const ChartCol = ({charts, devName, colClass}) => (
  <div className={colClass}>
    {charts.map((chart, i) => (
      <ChartPanel chart={chart} devName={devName} key={i} />
    ))}
  </div>
);

export default ChartCol
