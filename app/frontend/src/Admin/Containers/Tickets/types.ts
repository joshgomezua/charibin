import { ICity, DIRECTION_TYPE, MODAL_TYPE } from '../../Utils/adminTypes'
import { IResponseError, ITicket } from '../../../Common/Utils/globalTypes'

export interface IState {
  tickets: ITicket[]
  destinations: ICity[]
  isModalLoading: boolean
  isLoading: boolean
  isError: boolean
  modal: {
    id: string
    type: MODAL_TYPE | null
    heading: string
    data: ITicket
    trip: { _id: string; name: string } | null
  }
}
export interface IProps {
  selectedDate: Date
  filters: string[]
  direction: DIRECTION_TYPE | null
  changeFilters: (filters: string[]) => void
  changeSelectedDate: (date: Date) => void
  changeTicketType: (type: DIRECTION_TYPE | null) => void
  showError: (err: IResponseError, defaultText?: string) => void
  showSuccess: (msg: string) => void
}

export interface IEditedData {
  trip?: string
  direction?: string
  quantity?: number
  type?: string
  date?: {
    start: number
    end: number
  }
  active?: boolean
}
