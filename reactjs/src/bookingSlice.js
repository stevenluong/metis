const initialState = {}

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case 'booking/bookingSet': {
      //console.log(action.payload)
      return action.payload;
    }
    case 'booking/bookingEdited': {
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
