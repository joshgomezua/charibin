import { IOrder } from '../../Utils/adminTypes'
import { IResponseError } from '../../../Common/Utils/globalTypes'

export interface IState {
  orders: IOrder[]
  isLoading: boolean
  total: number
  currentPage: number
}

export interface IProps {
  showError: (err: IResponseError, defaultText?: string) => void
  showSuccess: (msg: string) => void
}
