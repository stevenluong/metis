const initialState = []

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case 'customers/customersRetrieved': {
      return [...action.payload]
    }
    case 'customers/customerAdded': {
      return [...state,action.payload]
    }
    case 'customers/customerEdited': {
      return [...state.map(x=>{
        return x._key==action.payload._key?action.payload:x
      })]
    }
    default:
      return state
  }
}
