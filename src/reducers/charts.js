import { combineReducers } from 'redux'

const getRandomInt = (max) => (Math.floor(Math.random() * Math.floor(max)));

const addData = (data, i, max_len) => {
  let newData = data.concat([getRandomInt(101) + i * 10]);

  if (newData.length > max_len) {
    return newData.slice(1);
  }

  return newData
};

const DataReducer = (state={}, action) => {
  switch(action.type) {
    case('ADD_DATA'):
      return Object.assign({}, state, {
        labels: state.labels,
        datasets: state.datasets.map((v, i) => (
          Object.assign({}, v, {
            data: addData(v.data, i, state.pointsNumber)
          })
        ))
      });
      break;
    default:
      return state;
  }
};

const OptionsReducer = (state={}, action) => (state);

const ChartReducer = combineReducers({
  data: DataReducer,
  options: OptionsReducer
});

const ChartsReducer = (state=[], action) => {
  switch(action.type) {
    case('ADD_DATA'):
      return state.map((chart, index) => {
        if(index == action.chartIndex) {
          return ChartReducer(chart, action);
        } else {
          return chart;
        }
      });
      break;
    default:
      return state;
  }
};

export default ChartsReducer;
