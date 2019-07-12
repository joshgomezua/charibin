import moment from 'moment'
import React from 'react'
import { Elements, StripeProvider } from 'react-stripe-elements'
import arrow from '../../../Common/Utils/Media/arrow.svg'
import BlueButton from '../BlueButton'
import { CardInfo } from '../CardInfoForm/CardInfoForm'
import {
  IPassengerFormControls,
  PassengerForm
} from '../PassengerForm/PassengerForm'
import ee from '../../Utils/emitter'
import { IPaymentFormControls, PaymentForm } from '../PaymentForm/PaymentForm'
import './styles.scss'
import { ICardInfoFormControls } from '../CardInfoForm/types'
import { IState, IProps, ISuccessValues } from './types'
import { Steps } from '../../Containers/Payment/type'

const PencilIcon = () => (
  <svg width="14px" height="14px" viewBox="0 0 14 14">
    <path
      fill="#91A1B1"
      fill-rule="nonzero"
      d="M8.318 2.965c-.33-.33-.906-.33-1.318 0l-.33.33-4.529 4.61-.165.083s-.494.494-1.482 3.788v.083c0 .082 0 .082-.082.165 0 .082 0 .082-.083.164 0 .083 0 .083-.082.165 0 .082-.082.247-.082.33-.083.246-.247.823-.083 1.07.165.165.742 0 .989-.082.082 0 .247-.083.329-.083.082 0 .082 0 .165-.082.082 0 .082 0 .164-.082.083 0 .165 0 .165-.083h.082c3.212-.988 3.789-1.482 3.789-1.482l.164-.165 4.612-4.612.33-.33c.329-.328.329-.987 0-1.317l-2.553-2.47zm-2.965 8.4c-.082 0-.082 0 0 0-.165.082-.659.33-1.73.74-.164.083-.247.083-.411.166l-1.565-1.565c.082-.165.082-.247.165-.412.412-1.07.659-1.565.74-1.73l.083-.082 2.8 2.8-.082.083zm8.235-8.4L10.953.329C10.623 0 9.965 0 9.635.33l-.659.66c-.329.329-.329.987 0 1.317l2.636 2.635c.33.33.988.33 1.317 0l.66-.659c.329-.411.329-.988 0-1.317z"
    />
  </svg>
)

const CheckmarkIcon = () => (
  <svg
    version="1.1"
    viewBox="0 0 26 26"
    width="20px"
    height="18px"
    fill="#12b459"
    enable-background="new 0 0 26 26">
    <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z" />
  </svg>
)

export default class Billing extends React.Component<IProps, IState> {
  getPassengerFormControls = this.getFormControls('passengerForm')
  getPaymentFormControls = this.getFormControls('paymentForm')
  getCardFormControls = this.getFormControls('cardForm')

  passengerForm: IPassengerFormControls
  paymentForm: IPaymentFormControls
  cardForm: ICardInfoFormControls

  readonly state: IState = {
    formError: null,
    isValidating: false,
    name: undefined
  }

  componentDidMount() {
    ee.on('SUBMIT', () => {
      this.handleSubmitClick()
    })
  }

  getFormControls(
    this: Billing,
    key: 'passengerForm' | 'paymentForm' | 'cardForm'
  ) {
    type FormControls =
      | IPassengerFormControls
      | IPaymentFormControls
      | ICardInfoFormControls
    return (handlers: FormControls) => {
      this[key] = handlers
    }
  }

  validatePassengerForm() {
    return new Promise((resolve, reject) => {
      this.passengerForm.validate().then((errs: object) => {
        if (Object.keys(errs).length > 0) {
          this.passengerForm.touchAll()
          return reject('Please fill the form correctly to proceed')
        }
        const {
          birthdate,
          birthmonth,
          birthyear
        } = this.passengerForm.getValues()
        const date = moment(
          `${birthyear}-${birthmonth}-${birthdate}`,
          'YYYY-MM-DD'
        )
        if (!date.isValid()) {
          return reject('Date is invalid')
        }
        resolve()
      })
    })
  }

  validatePaymentForm() {
    return new Promise((resolve, reject) => {
      this.paymentForm.validate().then((errs: object) => {
        if (Object.keys(errs).length > 0) {
          this.paymentForm.touchAll()
          return reject('Please fill the form correctly to proceed')
        }
        resolve()
      })
    })
  }

  validateCardForm() {
    const { name } = this.state
    return this.cardForm.createToken({ name }).then(res => {
      if (res.error) {
        throw res.error.message
      }
      return res.token!
    })
  }

  sendRequest(data: ISuccessValues) {
    this.props.onSuccess(data)
  }

  onChangeName = (name: string) => {
    this.setState({ name })
  }

  handleSubmitClick() {
    const { isValidating } = this.state
    const { step, setStep } = this.props

    if (isValidating) {
      return
    } else {
      this.setState({ isValidating: true })
    }
    switch (step) {
      case Steps.TravellerInfo: {
        return this.validatePassengerForm()
          .then(() => {
            this.setState({ formError: null })
            setStep(Steps.Payment)
          })
          .catch((err: string) => {
            this.setState({ formError: err })
          })
          .finally(() => {
            this.setState({ isValidating: false })
          })
      }
      case Steps.Payment: {
        return this.validatePaymentForm()
          .then(() => this.validateCardForm())
          .then(token =>
            this.sendRequest({
              cardToken: token.id,
              payment: this.paymentForm.getValues(),
              passenger: this.passengerForm.getValues()
            })
          )
          .catch((err: string) => {
            this.setState({ formError: err })
          })
          .finally(() => {
            this.setState({ isValidating: false })
          })
      }
    }
  }

  render() {
    const { step, setStep } = this.props
    const isPayment = Boolean(step)
    return (
      <div className={`billing ${isPayment ? 'step_1' : 'step_0'}`}>
        <div className="billing-header">
          <div className="billing-step">
            <span
              className={`billing-step_icon billing-step_icon-${
                isPayment ? 'green' : 'blue'
              }`}>
              {isPayment ? <CheckmarkIcon /> : 1}
            </span>

            <span className="billing-header-back">
              <span>Travelers info</span>
              {isPayment && (
                <button
                  className="billing-edit-info-text"
                  onClick={() => setStep(0)}>
                  <PencilIcon /> EDIT INFO
                </button>
              )}
            </span>
          </div>
          {new Array(10).fill(0).map((e, i) => (
            <i
              className={`billing-header_dot ${
                isPayment ? 'billing-header_dot-blue' : ''
              }`}
              key={i}
            />
          ))}
          <div className="billing-step">
            <span
              className={`billing-step_icon billing-step_icon-${
                isPayment ? 'blue' : 'gray'
              }`}>
              2
            </span>
            <span className={!isPayment ? 'billing-header-gray' : ''}>
              Payment
            </span>
          </div>
        </div>
        <div className="billing-passengers">
          <div className="billing-passengers-primary">
            <p className="billing-header-violet">Traveler Information</p>
            <PassengerForm getFormControls={this.getPassengerFormControls} />
          </div>
        </div>
        <div className="billing-payment">
          <div className="billing-payment-billing_info">
            <p className="billing-header-violet">Billing Info</p>
            <PaymentForm getFormControls={this.getPaymentFormControls} />
          </div>
          <div className="billing-payment-card">
            <p className="billing-header-violet">Card Info</p>
            <StripeProvider apiKey={'pk_test_e0oixM4xcywoSMO2mt8unWVA'}>
              <Elements>
                <CardInfo
                  name={this.state.name}
                  onChangeName={this.onChangeName}
                  getFormControls={this.getCardFormControls}
                />
              </Elements>
            </StripeProvider>
          </div>
        </div>
        <div className="billing-submit">
          <BlueButton
            children={[isPayment ? 'MAKE PAYMENT' : 'CONTINUE TO PAYMENT INFO']}
            onClick={() => this.handleSubmitClick()}
          />
          {isPayment && (
            <button
              className="billing-submit-back"
              onClick={() => {
                this.setState({ formError: null })
                setStep(0)
              }}>
              <img src={arrow} className="backArrow" />
              EDIT TRAVELERS INFO
            </button>
          )}
          {this.state.formError == null ? null : (
            <span className="billing-submit-error">{this.state.formError}</span>
          )}
        </div>
      </div>
    )
  }
}
