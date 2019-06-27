import { DIRECTION_TYPE, MODAL_TYPE } from '../../Utils/adminTypes'
import { IResponseError, ITicket } from '../../../Common/Utils/globalTypes'
import { IOptionTicket } from 'src/Admin/Components/DropdownTicket/types';

export interface IState {
  tickets: ITicket[]
  destinations: IOptionTicket[]
  isModalLoading: boolean
  isLoading: boolean
  isError: boolean
  modal: {
    id: string
    type: MODAL_TYPE | null
    heading: string
    data: ITicket
    trip: { _id: string; departure: string, destination: string } | null
  }
  calendarFilter: {
    start: Date | undefined
    end: Date | undefined
  }
}
export interface IProps {
  selectedDate: Date
  filters: string[]
  filterFrom: string[]
  filterTo: string []
  changeFilters: (filters: string[]) => void
  changeFilterFrom: (filterFrom: string[]) => void
  changeFilterTo: (filterTo: string[]) => void
  changeSelectedDate: (date: Date) => void
  changeTicketType: (type: DIRECTION_TYPE | null) => void
  showError: (err: IResponseError, defaultText?: string) => void
  showSuccess: (msg: string) => void
}

export interface IEditedData {
  trip?: string
  destination?: string
  depature?: string
  quantity?: number
  type?: string
  date?: {
    start: number
    end: number
  }
  active?: boolean
}

export interface ITripData {
  _id: string,
  departure: string,
  destination: string
}