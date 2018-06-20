const genDataset = (label, color, pointsNumber) => ({
  label: label,
  fill: false,
  lineTension: 0,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: color,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderWidth: 1,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 0,
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 0,
  pointRadius: 0,
  pointHitRadius: 10,
  data: Array(pointsNumber).fill(null),
});

const genData = (colors, pointsNumber, datasetsNumber) => ({
  labels: Array(pointsNumber).fill(''),
  datasets: Array(datasetsNumber).fill({}).map((v, index) => genDataset(index, colors[index], pointsNumber)),
  pointsNumber: pointsNumber
});

const genOptions = (title) => ({
  animation: {
    duration: 0,
    easing: 'linear'
  },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false,
    text: title,
    padding: 5
  },
  legend: {
    display: false
  }
});


const s = {
  navbar: {
    navbarToggled: false,
    sidenavToggled: false,
    topbar: [
      {
        menuOpen: true,
        text: 'Available Devices',
        items: []
      },
    ],
  },
  charts: [
    {
      devName: 'GR[L]',
      datasets: [
        {
          data: genData(['#f00', '#0f0', '#00f'], 250, 3),
          options: genOptions('Accelerometer Data'),
        },
        {
          data: genData(['#f00', '#0f0', '#00f'], 250, 3),
          options: genOptions('Gyroscope Data'),
        }
      ]
    },
    {
      devName: 'GR[R]',
      datasets: [
        {
          data: genData(['#f00', '#0f0', '#00f'], 250, 3),
          options: genOptions('Accelerometer Data'),
        },
        {
          data: genData(['#f00', '#0f0', '#00f'], 250, 3),
          options: genOptions('Gyroscope Data'),
        }
      ]
    },
  ],
}

export default {
  devices: {
    '98:D3:31:80:91:3A': {
      name: 'GR[R]',
      address: '98:D3:31:80:91:3A',
      connected: false,
    }
  },
  data: {
    '98:D3:31:80:91:3A': {
      gyro: [],
      acc: [],
      mag: [],
      pos: [],
      orientation: []
    }
  },
  ui: {
    charts: {
      '98:D3:31:80:91:3A': {
        raw_data: [
          {
            data: genData(['#f00', '#0f0', '#00f'], 250, 3),
            options: genOptions('Accelerometer Data'),
          },
          {
            data: genData(['#f00', '#0f0', '#00f'], 250, 3),
            options: genOptions('Gyroscope Data'),
          }
        ],
        trajectory: [],
        orientation: []
      }
    },
    navbar: {
      navbarToggled: false,
      sidenavToggled: false,
      topbar: {
        devmenu: {
          menuOpen: true,
          text: 'Available Devices',
          openItems: ['98:D3:31:80:91:3A']
        }
      }
    }
  }
}
