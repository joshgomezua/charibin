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
