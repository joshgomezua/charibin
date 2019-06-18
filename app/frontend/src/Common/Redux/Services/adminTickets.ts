import moment from 'moment'
import { IStore } from '../types'
import { ISelectDate, IFilters, ITicketType, IFilterFrom, IFilterTo } from './adminTicketsTypes'
import { ITicketsActions, TICKETS_ACTIONS } from './adminTicketsTypes'
import { DIRECTION_TYPE } from 'src/Admin/Utils/adminTypes'

// Reducer

const initialState = {
  direction: null,
  filters: [],
  filterTo: [],
  filterFrom: [],
  selectedDate: moment().toDate()
}

export const adminTicketsReducer = (
  state = initialState,
  action: ITicketsActions
) => {
  switch (action.type) {
    case TICKETS_ACTIONS.SELECTED_DATE_CHANGE:
      return { ...state, selectedDate: action.selectedDate }
    case TICKETS_ACTIONS.FILTERS_CHANGE:
      return { ...state, filters: action.filters }
    case TICKETS_ACTIONS.FILTER_FROM_CHANGE:
      return { ...state, filterFrom: action.filterFrom }
      case TICKETS_ACTIONS.FILTER_TO_CHANGE:
        return { ...state, filterTo: action.filterTo }  
    case TICKETS_ACTIONS.TICKETS_TYPE_CHANGE:
      return { ...state, direction: action.direction }
    default:
      return state
  }
}

// Action creators
export const changeSelectedDate = (selectedDate: Date): ISelectDate => ({
  type: TICKETS_ACTIONS.SELECTED_DATE_CHANGE,
  selectedDate
})

export const changeFilters = (filters: string[]): IFilters => ({
  type: TICKETS_ACTIONS.FILTERS_CHANGE,
  filters
})

export const changeFilterFrom = (filterFrom: string[]): IFilterFrom => ({
  type: TICKETS_ACTIONS.FILTER_FROM_CHANGE,
  filterFrom
})

export const changeFilterTo = (filterTo: string[]): IFilterTo => ({
  type: TICKETS_ACTIONS.FILTER_TO_CHANGE,
  filterTo
})

export const changeTicketType = (
  direction: DIRECTION_TYPE | null
): ITicketType => ({
  type: TICKETS_ACTIONS.TICKETS_TYPE_CHANGE,
  direction
})

const selectFilters = (state: IStore) => state.adminTickets.filters
const selectFilterFrom = (state: IStore) => state.adminTickets.filterFrom
const selectFilterTo = (state: IStore) => state.adminTickets.filterTo
const selectSelectedDate = (state: IStore) => state.adminTickets.selectedDate
const selectDirection = (state: IStore) => state.adminTickets.direction

export const Selectors = {
  selectDirection,
  selectFilters,
  selectFilterFrom,
  selectFilterTo,
  selectSelectedDate
}

export const Actions = {
  changeTicketType,
  changeFilters,
  changeFilterFrom,
  changeFilterTo,
  changeSelectedDate
}
