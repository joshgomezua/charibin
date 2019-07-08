import { ITrip, ISelectedData } from '../../Utils/appTypes'
import { IOption } from '../Dropdown/types'

export interface IProps {
  index: string
  selected?: boolean
  deselect?: boolean
  data: ITrip | ISelectedData
  isMax: boolean
  quantity?: number
  onSelect?: (data: ISelectedData) => void
  onDeselect?: (data: string | ISelectedData) => void
  onModify?: (tripId: string) => void
  onCalendarOpen?: () => void
  onCalendarClose?: () => void
}

export interface IState {
  calendar: boolean
  error: {
    state: boolean
    msg: string
  }
  dates: {
    start: Date | null
    end: Date | null
  }
  hours: {
    start: IOption | null
    end: IOption | null
  }
  hoursToSelect: {
    start: IOption[]
    end: IOption[]
  }

  startDates: string[]
  endDates: string[]
}
