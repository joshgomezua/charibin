import * as React from 'react'
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  injectStripe
} from 'react-stripe-elements'
import { RequiredLabel } from '../FormInput/RequiredAsterisk'
import './styles.scss'
import { Props } from './types'

class CardInfoForm extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
    if (typeof props.getFormControls === 'function') {
      props.getFormControls({
        createToken: props.stripe!.createToken
      })
    }
  }

  render() {
    return (
      <div className="card-wrapper">
        <label className="name-input-label">
          NAME ON CARD
          <span className="name-input-label-required">*</span>
        </label>
        <input
          className="name-input"
          value={this.props.name}
          onChange={e => this.props.onChangeName(e.target.value)}
        />
        <div className="card-number">
          <RequiredLabel text="CARD NUMBER" />
          <CardNumberElement />
        </div>
        <div className="card-expiry">
          <RequiredLabel text="EXPIRY DATE" />
          <CardExpiryElement />
        </div>
        <div className="card-cvc">
          <RequiredLabel text="CVC NUMBER" />
          <CardCVCElement />
        </div>
      </div>
    )
  }
}

export const CardInfo = injectStripe<Props>(CardInfoForm)
