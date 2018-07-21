import React from 'react'

import ChartPanel from './chartpanel.js'

const ChartCol = ({charts, devName}) => (
  <div className="col col-sm-12">
    {charts.map((chart, i) => (
      <ChartPanel chart={chart} devName={devName} key={i} />
    ))}
  </div>
);

export default ChartCol
