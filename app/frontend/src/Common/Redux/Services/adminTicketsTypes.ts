import { DIRECTION_TYPE } from '../../../Admin/Utils/adminTypes'

export enum TICKETS_ACTIONS {
  SELECTED_DATE_CHANGE = 'SELECTED_DATE_CHANGE',
  FILTERS_CHANGE = 'FILTERS_CHANGE',
  TICKETS_TYPE_CHANGE = 'TICKETS_TYPE_CHANGE'
}

export interface ISelectDate {
  type: TICKETS_ACTIONS.SELECTED_DATE_CHANGE
  selectedDate: Date
}

export interface IFilters {
  type: TICKETS_ACTIONS.FILTERS_CHANGE
  filters: string[]
}

export interface ITicketType {
  type: TICKETS_ACTIONS.TICKETS_TYPE_CHANGE
  direction: DIRECTION_TYPE | null
}

export type ITicketsActions = ISelectDate | IFilters | ITicketType
