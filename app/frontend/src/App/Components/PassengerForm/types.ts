import { FormikProps } from 'formik'
import { IPassengerFormControls } from './PassengerForm'

export interface IFormValues {
  firstName?: string
  middleName?: string
  lastName?: string
  phone?: string
  email?: string
  countryCode?: {
    id: string
    name: string
  }
  birthyear?: number
  birthmonth?: number
  birthdate?: number
}

export interface IOuterProps {
  getFormControls?: (handlers: IPassengerFormControls) => void
}

export type Props = FormikProps<IFormValues> & IOuterProps
