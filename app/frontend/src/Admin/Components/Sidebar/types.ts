import { ICity, DIRECTION_TYPE } from '../../Utils/adminTypes'

export interface IProps {
  filters: string[]
  filterFrom: string
  filterTo: string
  cities: ICity[]
  selectedDate: Date
  calendarFilter:{
    start: Date | undefined
    end: Date | undefined
  }
  direction: DIRECTION_TYPE | null
  changeFilters: (filters: string[]) => void
  changeFilterFrom: (filterFrom: string) => void
  changeFilterTo: (filterTo: string) => void
  changeSelectedDate: (date: Date) => void
  changeDirectionType: (type: DIRECTION_TYPE | null) => void
}
