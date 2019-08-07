import { IResponseError } from '../../../Common/Utils/globalTypes'
import { ISelectedData, IFinalSelected, IPassenger } from '../../Utils/appTypes'

export interface IState {
  step: Steps
  remainingTime: string
  isLoading: boolean
}

export enum Steps {
  TravellerInfo,
  Payment
}

export interface ISuccessData {}

export interface IProps {
  quantity: IPassenger
  selected: ISelectedData[]
  deselectionPrice: number
  setFinalDestination: (selected: IFinalSelected) => void
  showError: (err: IResponseError, defaultText?: string) => void
  showSuccess: (msg: string) => void
  countdown: (
    date: Date | string,
    showSuccess: (message: string) => void,
    pushHistory: (path: string) => void,
    setRemainingTime: (time: string) => void,
    interval: any
  ) => void
}
