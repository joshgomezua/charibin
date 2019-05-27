import { combineReducers } from 'redux'
import { userReducer } from './Services/user'
import { tripsReducer } from './Services/trips'
import { adminTicketsReducer } from './Services/adminTickets'

export const rootReducer = combineReducers({
  user: userReducer,
  trips: tripsReducer,
  adminTickets: adminTicketsReducer
})
