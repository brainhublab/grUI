import React from 'react'
import { Line as LineChart } from 'react-chartjs-2'

import Panel from './panel.js'

const ChartPanel = ({chart, devName}) => (
  <Panel title={devName + ' - ' + chart.options.title.text}>
    <LineChart data={chart.data} options={chart.options} redraw={false} />
  </Panel>
)

export default ChartPanel
