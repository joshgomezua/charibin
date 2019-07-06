import { ITrip, ISelectedData } from '../../../App/Utils/appTypes'
import { IResponseError } from '../../../Common/Utils/globalTypes'

export interface IFiltersChange {
  min?: number
  max?: number
  start?: Date
  end?: Date
}

export interface IFilters {
  min: number
  max: number
  start: Date | undefined
  end: Date | undefined
}

export interface IState {
  trips: ITrip[]
  filters: {
    start: Date | undefined
    end: Date | undefined
    min: number
    max: number
  }
  page: number
  isLoading: boolean
  isCalendarOpen: boolean
  tripsFilteredQty: number
}

export interface IProps {
  isMax: boolean
  quantity: number
  selected: ISelectedData[]
  showError: (err: IResponseError, defaultText?: string) => void
  showSuccess: (msg: string) => void
  setQuantity: (quantity: number) => void
  addSelected: (selected: ISelectedData) => void
  removeSelected: (tripId: string) => void
  updateSelected: (selected: ISelectedData[]) => void
}

export interface IBookedType {
  arrivalTicket: string
  cost: number
  departureTicket: string
  trip: string
  withTime: boolean
  _id: string
}

export interface ITripInfo {
  _id: string
  arrivalTicketsQty: number
  departureTicketsQty: number
}
