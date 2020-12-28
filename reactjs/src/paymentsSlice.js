const initialState = []

export default function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    case 'payments/paymentsRetrieved': {
      return [...action.payload]
    }
    case 'payments/paymentAdded': {
      return [...state,action.payload]
    }
    case 'payments/paymentEdited': {
      return [...state.map(x=>{
        return x._key==action.payload._key?action.payload:x
      })]
    }
    default:
      return state
  }
}
