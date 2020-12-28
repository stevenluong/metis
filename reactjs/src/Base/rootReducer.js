import { combineReducers } from 'redux'

import customersReducer from '../customersSlice'
import customerReducer from '../customerSlice'
//import filtersReducer from '../filtersSlice'
import userReducer from '../userSlice'
import bookingsReducer from '../bookingsSlice'
import paymentsReducer from '../paymentsSlice'
import interestsReducer from '../interestsSlice'
import interestReducer from '../interestSlice'
import bookingReducer from '../bookingSlice'
import paymentReducer from '../paymentSlice'

const rootReducer = combineReducers({
  // always return a new object for the root state
    // the value of `state.todos` is whatever the todos reducer returns
    customers: customersReducer,
    customer: customerReducer,
    // For both reducers, we only pass in their slice of the state
    //filters: filtersReducer,
    user: userReducer,
    //items: itemsReducer,
    bookings: bookingsReducer,
    payments: paymentsReducer,
    interests: interestsReducer,
    interest: interestReducer,
    booking: bookingReducer,
    payment: paymentReducer
  })
export default rootReducer
