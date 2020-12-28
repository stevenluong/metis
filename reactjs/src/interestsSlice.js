const initialState = []

export default function interestsReducer(state = initialState, action) {
  switch (action.type) {
    case 'interests/interestsRetrieved': {
      return [...action.payload]
    }
    case 'interests/interestAdded': {
      return [...state,action.payload]
    }
    case 'interests/interestEdited': {
      return [...state.map(x=>{
        return x._key==action.payload._key?action.payload:x
      })]
    }
    default:
      return state
  }
}
