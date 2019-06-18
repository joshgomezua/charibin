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
    time1?: number
    time2?: number
    time3?: number
    time4?: number
    time5?: number
    time6?: number
    time7?: number
    time8?: number
    time9?: number
    time10?: number
  }
  discount: number
  duration: number
  fake: boolean
  departure: string
  destination: string
  carrier: string
  photo: string
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
    time1: number
    time2: number
    time3: number
    time4: number
    time5: number
    time6: number
    time7: number
    time8: number
    time9: number
    time10: number
  }
  discount?: number
  duration?: number
  fake?: boolean
  departure?: string
  destination?: string
  carrier?: string
  photo?: string
  price?: number
  type?: string
}