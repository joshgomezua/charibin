import { IResponseError } from '../../../Common/Utils/globalTypes'

export interface IFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

export interface IProps {
  showError: (err: IResponseError, defaultText?: string) => void
  showSuccess: (msg: string) => void
}
