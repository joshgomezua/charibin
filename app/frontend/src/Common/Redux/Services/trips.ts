import {
  ITipsActions,
  TRIPS_ACTIONS,
  IAddDeselected,
  IAddSelected,
  IRemoveSelected,
  ISetQuantity,
  IClearDeselected,
  IClearSelected,
  IsetDeparture
} from './tripsTypes'
import { ISelectedData, IFinalSelected, IPassenger } from '../../../App/Utils/appTypes'
import { getFromLS } from '../../Utils/helpers'
import { IStore } from '../types'

// Reducer
const owner = getFromLS('owner')

const initialState = {
  departure: (owner && owner.data.departure) || '',
  quantity: (owner && owner.data.quantity) || {Adult: 1, Youth: 0},
  selected: (owner && owner.data.selected) || [],
  deselected: (owner && owner.data.deselected) || [],
  finalDestination: {}
}

export const tripsReducer = (state = initialState, action: ITipsActions) => {

  switch (action.type) {
    case TRIPS_ACTIONS.ADD_SELECTED:
      return { ...state, selected: [...state.selected, action.selected] }
    case TRIPS_ACTIONS.REMOVE_SELECTED:
      const newSelected = state.selected.filter(
        (selected: ISelectedData) => selected.tripId !== action.selectedId
      )
      return { ...state, selected: newSelected }
    case TRIPS_ACTIONS.UPDATE_SELECTED:
      return { ...state, selected: action.selected }
    case TRIPS_ACTIONS.SET_FINAL_DESTINATION:
      return { ...state, finalDestination: action.selected }
    case TRIPS_ACTIONS.ADD_DESELECTED:
      return { ...state, deselected: [...state.deselected, action.deselected] }
    case TRIPS_ACTIONS.CLEAR_DESELECTED:
      return { ...state, deselected: [] }
    case TRIPS_ACTIONS.CLEAR_SELECTED:
      return { ...state, selected: [] }
    case TRIPS_ACTIONS.SET_QUANTITY:
      return { ...state, quantity: action.quantity }
    case TRIPS_ACTIONS.SET_INITIAL_STATE:
      return initialState
    case TRIPS_ACTIONS.SET_DEPARTURE:
      return {...state, departure: action.departure}
    default:
      return state
  }
}

// Action creators

export const addSelected = (selected: ISelectedData): IAddSelected => ({
  type: TRIPS_ACTIONS.ADD_SELECTED,
  selected
})

export const removeSelected = (selectedId: string): IRemoveSelected => ({
  type: TRIPS_ACTIONS.REMOVE_SELECTED,
  selectedId
})

export const addDeselected = (deselected: ISelectedData): IAddDeselected => ({
  type: TRIPS_ACTIONS.ADD_DESELECTED,
  deselected
})

export const clearSelected = (): IClearSelected => ({
  type: TRIPS_ACTIONS.CLEAR_SELECTED
})

export const clearDeselected = (): IClearDeselected => ({
  type: TRIPS_ACTIONS.CLEAR_DESELECTED
})

export const setQuantity = (quantity: IPassenger): ISetQuantity => ({
  type: TRIPS_ACTIONS.SET_QUANTITY,
  quantity
})

export const setDeparture = (departure: string): IsetDeparture => ({
  type: TRIPS_ACTIONS.SET_DEPARTURE,
  departure
})

export const updateSelected = (selected: ISelectedData[]) => ({
  type: TRIPS_ACTIONS.UPDATE_SELECTED,
  selected
})

export const setFinalDestination = (selected: IFinalSelected) => ({
  type: TRIPS_ACTIONS.SET_FINAL_DESTINATION,
  selected
})

export const setInitialState = () => ({
  type: TRIPS_ACTIONS.SET_INITIAL_STATE
})

export const selectSelected = (state: IStore) => state.trips.selected
export const selectDeselected = (state: IStore) => state.trips.deselected
export const selectIsMaxSelected = (state: IStore) =>
  state.trips.selected.length >= 5
export const selectIsMaxDeselected = (state: IStore) =>
  state.trips.deselected.length >= 2
export const selectQuantity = (state: IStore) => {
   return state.trips.quantity
} 
export const selectDeparture = (state: IStore) => {
  return state.trips.departure
}
export const selectFinalSelection = (state: IStore) =>
  state.trips.finalDestination
export const selectFinalSelected = (state: IStore) => {
  return state.trips.selected.filter((item: ISelectedData, index: number) => {
    const isSome = state.trips.deselected.some(
      (deselected: ISelectedData) => deselected.tripId === item.tripId
    )

    return !isSome
  })
}
export const deselectionPrice = (state: IStore) => {
  return state.trips.deselected.reduce(
    (total: number, item: ISelectedData) => total + item.deselectionPrice,
    0
  )
}
