import { combineReducers } from 'redux'

const parseData = (data) => {
  let out = {}
  let parts = data.split(' ')

  out['acc'] = parts[1].split(',').map((v) => parseFloat(v))
  out['gyro'] = parts[2].split(',').map((v) => parseFloat(v))
  out['mag'] = parts[3].split(',').map((v) => parseFloat(v))

  return out
}

const ChartReducer = (state={}, action) => {
  switch(action.type) {
    case('ADD_DATA'):
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
        smallCharts: state.smallCharts.map((val, index) => {
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

const RawChartsReducer = (state={}, action) => {
  switch(action.type) {
    case('ADD_DATA'):
      let updatedChart = {}
      let key = action.chartIndex

      if (!state.hasOwnProperty(key)) {
        return state
      }

      updatedChart[key] = ChartReducer(state[key], action)

      return Object.assign({}, state, updatedChart);
      break;
    default:
      return state;
  }
};

const RotationChartsReducer = (state={}, action) => {
  switch(action.type) {
    case('ADD_ROTATIONS_DATA'):
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
      break
    default:
      return state
  }
}

const ChartsReducer = combineReducers({
  raw: RawChartsReducer,
  rotations: RotationChartsReducer
})

export default ChartsReducer;
