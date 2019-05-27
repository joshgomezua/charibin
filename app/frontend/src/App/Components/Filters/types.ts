import { IFilters, IFiltersChange } from '../../Containers/Select/types'

export interface IProps {
  filters: IFilters
  fetchTrips: () => void
  clearDates: () => void
  clearPrice: () => void
  onChange: (filters: IFiltersChange, callback?: () => void) => void
}
export interface IState {
  calendarVisible: boolean
  priceVisible: boolean
  priceTouched: boolean
}
