import { IPassengerFormControls } from '../PassengerForm/PassengerForm'
import { IPaymentFormControls } from '../PaymentForm/PaymentForm'
import { Steps } from '../../Containers/Payment/type'

export interface IState {
  formError: string | null
  isValidating: boolean
  name: string | undefined
}

export interface ISuccessValues {
  cardToken: string
  passenger: ReturnType<IPassengerFormControls['getValues']>
  payment: ReturnType<IPaymentFormControls['getValues']>
}

export interface IProps {
  step: Steps
  setStep: (step: Steps) => void
  onSuccess: (data: any) => void
}
