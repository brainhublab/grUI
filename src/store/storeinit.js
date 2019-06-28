const CHART_SIZE_SMALL = 100;
const CHART_SIZE_NORMAL = 200;

const genDataset = (label, color, pointsNumber) => ({
    label: label,
    fill: false,
    lineTension: 0,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: color,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderWidth: 2,
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
    data: Array(pointsNumber).fill(Math.random()),
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
    }, responsive: true,
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

const genChart = (name, colors, pointsNumber, datasetsNumber) => ({
    data: genData(colors, pointsNumber, datasetsNumber),
    options: genOptions(name),
});

const genCharts = () => ({
    'bigCharts': [
        genChart('Accelerometer Data', ['#f00', '#0f0', '#00f'], CHART_SIZE_NORMAL, 3),
        genChart('Gyroscope Data', ['#f00', '#0f0', '#00f'], CHART_SIZE_NORMAL, 3),
    ],
    'smallCharts': [
        genChart('Acc + Gyro data', ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'], CHART_SIZE_SMALL, 6)
    ]
});

export default {
    devices: {
        palm: 'Palm',
        thumb: 'Thumb',
        index: 'Index',
        middle: 'Middle',
        ring: 'Ring',
        pinky: 'Pinky',
        pinky2: 'Pinky2',
        pinky3: 'Pinky3',
    },
    //   data: [
    //     {
    //       key: 1,
    //       data: []
    //     }
    //   ],
    //   charts: [
    //     {
    //       key: 1,
    //       data: {},
    //       options: {}
    //     }
    //   ],
    //   fstPageCharts: [1],
    //   sndPageCharts: [1],
    ui: {
        charts: {
            raw: {
                palm: genCharts(),
                thumb: genCharts(),
                index: genCharts(),
                middle: genCharts(),
                ring: genCharts(),
                pinky: genCharts(),
                pinky2: genCharts(),
                pinky3: genCharts(),
            },
            rotations: genChart('Rotations data', ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f', '#8ff', '#f8f'], CHART_SIZE_NORMAL, 8)
        },
        navbar: {
            navbarToggled: false,
            sidenavToggled: false,
            topbar: {
                devmenu: {
                    menuOpen: false,
                    text: 'Available IMUs',
                    currentIMU: 'palm'
                }
            }
        },
        hands: {
            palm: {
                x: 0,
                y: 0,
                z: 0
            },
            thumb: 0,
            index: 0,
            middle: 0,
            ring: 0,
            pinky: 0
        }
    }
};
