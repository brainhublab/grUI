const devices = (state={}, action) => {
  switch(action.type) {
    case('ADD_DEVICE'):
      return Object.assign({}, state, {
        [action.dev.address]: action.dev
      });
      break;
    case('REMOVE_DEVICE'):
      return Object.keys(state).reduce((res, k) => {
        if(k !==  action.id) {
          res[k] = state[k];
        }
        return res;
      }, {});
      break;
    default:
      return state;
  }
}

export default devices
