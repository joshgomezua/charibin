import { ITrip, MODAL_TYPE, ICity } from '../../Utils/adminTypes'
import { IResponseError, IScheduledTrip } from '../../../Common/Utils/globalTypes'

export interface  IState {
  trips: ITrip[]
  oppositeTrips: ITrip[]
  filtersFrom: string[]
  filtersTo: string[]
  selection: any[]
  selectedCheckbox: {}
  results: ITrip[]
  availableCities: ICity[]
  total: number
  selectAll: number
  isModalLoading: boolean
  isLoading: boolean
  currentPage: number
  editData: ITrip & { bidirectionalChange?: boolean}
  editSchedule: IScheduledTrip & { bidirectionalChange?: boolean}
  modal: {
    id: string
    type: MODAL_TYPE | null
    heading: string
  }
}

export interface IProps {
  filterFrom: string[]
  filterTo: string[]
  filters: string[]
  changeFilters: (filters: string[]) => void
  changeFilterFrom: (filterFrom: string[]) => void
  changeFilterTo: (filterTo: string[]) => void
  showError: (err: IResponseError, defaultText?: string) => void
  showSuccess: (msg: string) => void
}

export interface INewData {
  _id: string
  active: boolean
  deselectionPrice: number
  timeSelection: {
    defaultPrice: number
    _0to6AM?: number
    _6to8AM?: number
    _8to10AM?: number
    _10to12PM?: number
    _12to2PM?: number
    _2to4PM?: number
    _4to6PM?: number
    _6to8PM?: number
    _8to10PM?: number
    _10to12AM?: number
  }
  scheduledTrips?: IScheduledTrip[]
  discount: number
  duration: number
  fake: boolean
  departure: ICity
  destination: ICity
  carrier: string
  photo: string
  adultPrice: number
  childPrice: number
  type: string
  isFromAPI: boolean
}

export interface INewSchedule {
  _id?: string
  active: boolean
  deselectionPrice: number
  timeSelection: {
    defaultPrice: number
    _0to6AM?: number
    _6to8AM?: number
    _8to10AM?: number
    _10to12PM?: number
    _12to2PM?: number
    _2to4PM?: number
    _4to6PM?: number
    _6to8PM?: number
    _8to10PM?: number
    _10to12AM?: number
  }
  date: {
    start: string
    end: string
  }
  discount: number
  duration: number
  adultPrice: number
  childPrice: number
  trip?: string
}

export interface IEditTimeSchedule {
  _id: string
  active?: boolean
  deselectionPrice?: number
  timeSelection: {
    defaultPrice?: number
    _0to6AM: number
    _6to8AM: number
    _8to10AM: number
    _10to12PM: number
    _12to2PM: number
    _2to4PM: number
    _4to6PM: number
    _6to8PM: number
    _8to10PM: number
    _10to12AM: number
  }
  bidirectionalChange?: boolean
  discount?: number
  duration?: number
  fake?: boolean
  departure?: ICity
  destination?: ICity
  carrier?: string
  photo?: string
  adultPrice?: number
  childPrice?: number
  type?: string
}

export interface IBulkChange {
  active: string
  adultPrice: number
  childPrice: number
  fake: string
  deselectionPrice: number
  discount: number
  duration: number
  timeSelection: {
    defaultPrice: number
  }
}