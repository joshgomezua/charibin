import { ICity, DIRECTION_TYPE } from '../../Utils/adminTypes'

export interface IProps {
  filters: string[]
  cities: ICity[]
  selectedDate: Date
  direction: DIRECTION_TYPE | null
  changeFilters: (filters: string[]) => void
  changeSelectedDate: (date: Date) => void
  changeDirectionType: (type: DIRECTION_TYPE | null) => void
}
