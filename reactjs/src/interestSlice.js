const initialState = {}

export default function interestReducer(state = initialState, action) {
  switch (action.type) {
    case 'interest/interestSet': {
      //console.log(action.payload)
      return action.payload;
    }
    case 'interest/interestEdited': {
      var c = {...state};
      var field = action.payload[0];
      var value = action.payload[1];
      c[field] = value;
      //console.log(c);
      return c;
    }
    default:
      return state
  }
}
