import { ISelectedData, IPassenger } from '../../Utils/appTypes'
import { Steps } from '../../Containers/Payment/type'


export interface IProps {
  deselectionPrice: number
  quantity: IPassenger
  tours: ISelectedData[]
  step: Steps
  onSubmit: () => void
  setStep: (step: Steps) => void
}
