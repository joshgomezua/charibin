import { ISelectedData, IFinalSelected } from '../../Utils/appTypes'

export interface IState {
  completed: boolean
}

export interface IProps {
  quantity: number
  deselectionPrice: number
  selected: ISelectedData[]
  finalSeletion: IFinalSelected
  setInitialState: () => void
}
