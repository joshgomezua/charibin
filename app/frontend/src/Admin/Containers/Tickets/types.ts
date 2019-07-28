import { DIRECTION_TYPE, MODAL_TYPE } from '../../Utils/adminTypes'
import { IResponseError, ITicket } from '../../../Common/Utils/globalTypes'
import { IOptionTicket } from 'src/Admin/Components/DropdownTicket/types';

export interface IState {
  tickets: ITicket[]
  ticketsDefault: ITicket[]
  departures: IOptionTicket[]
  departuresOptions: IOptionTicket[]
  destinations: IOptionTicket[]
  destinationsOptions: IOptionTicket[]
  carriers: IOptionTicket[]
  carriersOptions: IOptionTicket[]
  types: IOptionTicket[]
  typesOptions: IOptionTicket[]
  isModalLoading: boolean
  isLoading: boolean
  isError: boolean
  modal: {
    id: string
    type: MODAL_TYPE | null
    heading: string
    data: ITicket
    trip: { _id: string; departure: string, destination: string, carrier: string, type: string, duration: number } | null
  }
  calendarFilter: {
    start: Date | undefined
    end: Date | undefined
  }
  modalOptions: any[]
  pagination: IPagination
  requestInfo: IRequestInfo
}

export interface IProps {
  selectedDate: Date
  filters: string[]
  filterFrom: string[]
  filterCarrier: string[]
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
  _id: string
  departure: string
  destination: string
}

export interface IPagination {
  qtyOfItems: number
  qtyTotal: number
  pageLimit: number
  currentPage: number
  index: number
}

export interface IRequestInfo {
  initialDate: Date
  finalDate: Date | '0'
  from: string,
  to: string,
  carrier: string,
  page: number,
  limit: number
}