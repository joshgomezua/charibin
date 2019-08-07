import { ISelectedData, IFinalSelected, IPassenger } from '../../../App/Utils/appTypes'

export enum TRIPS_ACTIONS {
  ADD_SELECTED = 'ADD_SELECTED',
  REMOVE_SELECTED = 'REMOVE_SELECTED',
  UPDATE_SELECTED = 'UPDATE_SELECTED',
  ADD_DESELECTED = 'ADD_DESELECTED',
  SET_QUANTITY = 'SET_QUANTITY',
  SET_FINAL_DESTINATION = 'SET_FINAL_DESTINATION',
  SET_DEPARTURE = 'SET_DEPARTURE',
  CLEAR_DESELECTED = 'CLEAR_DESELECTED',
  CLEAR_SELECTED = 'CLEAR_SELECTED',
  SET_INITIAL_STATE = 'SET_INITIAL_STATE'
}

export interface IAddSelected {
  type: TRIPS_ACTIONS.ADD_SELECTED
  selected: ISelectedData
}

export interface IUpdateSelected {
  type: TRIPS_ACTIONS.UPDATE_SELECTED
  selected: ISelectedData[]
}

export interface IRemoveSelected {
  type: TRIPS_ACTIONS.REMOVE_SELECTED
  selectedId: string
}

export interface IAddDeselected {
  type: TRIPS_ACTIONS.ADD_DESELECTED
  deselected: ISelectedData
}

export interface ISetQuantity {
  type: TRIPS_ACTIONS.SET_QUANTITY
  quantity: IPassenger
}

export interface IClearDeselected {
  type: TRIPS_ACTIONS.CLEAR_DESELECTED
}

export interface IClearSelected {
  type: TRIPS_ACTIONS.CLEAR_SELECTED
}

export interface ISetFinalDestiantion {
  type: TRIPS_ACTIONS.SET_FINAL_DESTINATION
  selected: IFinalSelected
}

export interface IsetDeparture {
  type: TRIPS_ACTIONS.SET_DEPARTURE
  departure: string
}

export interface IInitialState {
  type: TRIPS_ACTIONS.SET_INITIAL_STATE
}

export type ITipsActions =
  | IAddSelected
  | IAddDeselected
  | IRemoveSelected
  | ISetQuantity
  | IClearDeselected
  | IUpdateSelected
  | ISetFinalDestiantion
  | IInitialState
  | IClearSelected
  | IsetDeparture
