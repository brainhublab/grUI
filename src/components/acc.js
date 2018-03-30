import React from 'react'
import { Line as LineChart } from 'react-chartjs-2'

import Panel from './panel.js'



const Acc = ({charts, handleClick}) => {
  let panels = charts.map((sensor, index) => (
    <div className="col">
      {sensor.datasets.map((chart, index) => (
        <Panel title={sensor.devName + ' - ' + chart.options.title.text} key={index}>
          <LineChart data={chart.data} options={chart.options} onClick={handleClick(index)} />
        </Panel>
      ))}
    </div>
  ));

  return (
    <div className="row">
        {panels}
    </div>
  );
}

export default Acc
