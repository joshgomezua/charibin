import { ReactStripeElements } from 'react-stripe-elements'

export interface IOutterProps {
  getFormControls(x: ICardInfoFormControls): void
  name: string | undefined
  onChangeName: (name: string) => void
}

export interface ICardInfoFormControls {
  createToken: ReactStripeElements.StripeProps['createToken']
}

export type Props = ReactStripeElements.InjectedStripeProps & IOutterProps
