const parseData = (s_data) => {
    let parts = s_data.split(' ');
    let out = {};

    out['palm'] = parts.slice(0, 3).map((el) => parseFloat(el));
    out['thumb'] = parseFloat(parts[3]);
    out['index'] = parseFloat(parts[4]);
    out['middle'] = parseFloat(parts[5]);
    out['ring'] = parseFloat(parts[6]);
    out['pinky'] = parseFloat(parts[7]);

    return out;
};


export default (state={}, action) => {
    let data = null;

    switch(action.type) {
    case('ADD_ROTATIONS_DATA'):
        data = parseData(action.data);
        return Object.assign({}, state, data);
    default:
        return state;
    }
};
