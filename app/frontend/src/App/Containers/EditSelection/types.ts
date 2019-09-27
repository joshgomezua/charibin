import { ISelectedData } from '../../Utils/appTypes'
import { IResponseError } from '../../../Common/Utils/globalTypes'

export interface IState {
  remainingTime: string
}

export interface IProps {
  isMax: boolean
  selected: ISelectedData[]
  deselected: ISelectedData[]
  showError: (err: IResponseError, defaultText?: string) => void
  showSuccess: (msg: string) => void
  clearDeselected: () => void
  countdown: (
    date: Date | string,
    showSuccess: (message: string) => void,
    pushHistory: (path: string) => void,
    setRemainingTime: (time: string) => void,
    interval: any
  ) => void
  addDeselected: (deselectedItem: ISelectedData) => void
}
