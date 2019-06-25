import { ITrip, MODAL_TYPE } from '../../Utils/adminTypes'
import { IResponseError } from '../../../Common/Utils/globalTypes'

export interface IState {
  trips: ITrip[]
  total: number
  isModalLoading: boolean
  isLoading: boolean
  currentPage: number
  editData: ITrip
  modal: {
    id: string
    type: MODAL_TYPE | null
    heading: string
  }
}

export interface IProps {
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
  discount: number
  duration: number
  fake: boolean
  departure: string
  destination: string
  carrier: string
  price: number
  type: string
  isFromAPI: boolean
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
  discount?: number
  duration?: number
  fake?: boolean
  departure?: string
  destination?: string
  carrier?: string
  price?: number
  type?: string
}