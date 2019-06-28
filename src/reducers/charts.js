import { combineReducers } from 'redux'

const parseData = (data) => {
  let out = {
    'acc': [],
    'gyro': [],
    'mag': [],
  };

  data.forEach((arr) => {
    let acc = arr.slice(0,3);
    let gyro = arr.slice(3, 6);
    let mag = arr.slice(6);

    for (let i = 0; i < 3; i++) {
      out.acc[i].push(acc[i]);
      out.gyro[i].push(gyro[i]);
      out.mag[i].push(mag[i]);
    }
  });

  return out;
}

const ChartReducer = (state={}, action) => {
  switch(action.type) {
    case('ADD_DATA'): {
      let data = parseData(action.data);
      return Object.assign({}, state, {
        bigCharts: state.bigCharts.map((val, index) => {
          if (index == 0) {
            return Object.assign({}, val, {
              data: Object.assign({}, val.data, {
                datasets: val.data.datasets.map((v, i) => {
                  let newData = v.data.concat(data.acc[i])
                  newData = newData.slice(1)
                  return Object.assign({}, v, {
                    data: newData
                  })
                })
              }),
              options: val.options
            })
          } else if (index == 1) {
            return Object.assign({}, val, {
              data: Object.assign({}, val.data, {
                datasets: val.data.datasets.map((v, i) => {
                  let newData = v.data.concat(data.gyro[i])
                  newData = newData.slice(1)
                  return Object.assign({}, v, {
                    data: newData
                  })
                })
              })
            })
          }
        }),
        smallCharts: state.smallCharts.map((val) => {
          return Object.assign({}, val, {
            data: Object.assign({}, val.data, {
              datasets: val.data.datasets.map((v, i) => {
                let newData = []
                if (i < 3) {
                  newData = v.data.concat(data.acc[i])
                } else {
                  newData = v.data.concat(data.gyro[i - 3])
                }
                newData = newData.slice(1)
                return Object.assign({}, v, {
                  data: newData
                })
              })
            })
          })
        })
      })
    }
  }
}

const RawChartsReducer = (state={}, action) => {
  switch(action.type) {
    case('ADD_DATA'): {
      let updatedChart = {}
      let key = action.chartIndex

      if (!state.hasOwnProperty(key)) {
        return state
      }

      updatedChart[key] = ChartReducer(state[key], action)

      return Object.assign({}, state, updatedChart);
    }
    default:
      return state;
  }
};

const RotationChartsReducer = (state={}, action) => {
  switch(action.type) {
    case('ADD_ROTATIONS_DATA'): {
      let parts = action.data.split(' ')
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          datasets: state.data.datasets.map((v, i) => {
            let newData = v.data.concat(parts[i]);
            newData = newData.slice(1)
            return Object.assign({}, v, {data: newData})
          })
        })
      })
    }
    default:
      return state
  }
}

const ChartsReducer = combineReducers({
  raw: RawChartsReducer,
  rotations: RotationChartsReducer
})

export default ChartsReducer;
