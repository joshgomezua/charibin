import { IPaymentFormControls } from './PaymentForm'
import { FormikProps } from 'formik'

export interface IFormValues {
  address: string
  city: string
  zipCode: string
}

export interface IOuterProps {
  getFormControls?: (handlers: IPaymentFormControls) => void
}

export type Props = FormikProps<IFormValues> & IOuterProps
