const initialState = {}

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case 'customer/customerSet': {
      //console.log(action.payload)
      return action.payload;
    }
    case 'customer/customerEdited': {
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
