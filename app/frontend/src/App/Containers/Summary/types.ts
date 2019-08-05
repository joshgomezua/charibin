import { ISelectedData, IFinalSelected, IPassenger } from '../../Utils/appTypes'

export interface IState {
  completed: boolean
}

export interface IProps {
  quantity: IPassenger
  deselectionPrice: number
  selected: ISelectedData[]
  finalSeletion: IFinalSelected
  setInitialState: () => void
}
