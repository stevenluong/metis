const initialState = []

export default function bookingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'bookings/bookingsRetrieved': {
      return [...action.payload]
    }
    case 'bookings/bookingAdded': {
      return [...state,action.payload]
    }
    case 'bookings/bookingEdited': {
      return [...state.map(x=>{
        return x._key==action.payload._key?action.payload:x
      })]
    }
    default:
      return state
  }
}
