export enum TICKETS_ACTIONS {
  SELECTED_DATE_CHANGE = 'SELECTED_DATE_CHANGE',
  FILTERS_CHANGE = 'FILTERS_CHANGE',
  FILTER_FROM_CHANGE = 'FILTER_FROM_CHANGE',
  FILTER_TO_CHANGE = 'FILTER_TO_CHANGE',
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

export interface IFilterFrom {
  type: TICKETS_ACTIONS.FILTER_FROM_CHANGE
  filterFrom: string[]
}

export interface IFilterTo {
  type: TICKETS_ACTIONS.FILTER_TO_CHANGE
  filterTo: string[]
}

export interface ITicketType {
  type: TICKETS_ACTIONS.TICKETS_TYPE_CHANGE
}

export type ITicketsActions = ISelectDate | IFilters | ITicketType | IFilterFrom | IFilterTo
