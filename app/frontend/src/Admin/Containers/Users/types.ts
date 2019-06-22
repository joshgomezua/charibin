import { IUser, MODAL_TYPE } from '../../Utils/adminTypes'
import { IResponseError } from '../../../Common/Utils/globalTypes'

export interface IState {
  users: IUser[]
  usersTable: IUser[]
  total: number
  isModalLoading: boolean
  isLoading: boolean
  currentPage: number
  editData: IUser
  modal: {
    id: string
    type: MODAL_TYPE | null
    heading: string
  }
  enable: boolean
}

export interface IProps {
  showError: (err: IResponseError, defaultText?: string) => void
  showSuccess: (msg: string) => void
}
