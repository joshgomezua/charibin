import React, { Component } from 'react'
import moment from 'moment'
import { padStart } from 'lodash'
import { connect } from 'react-redux'

import Billing from '../../Components/Billing/Billing'
import BillingStatus from '../../Components/BillingStatus'
import MainBlock from '../../Components/MainBlock'
import Steps from '../../Components/Steps'
import Title from '../../Components/Title'
import Loader from '../../../Common/Components/Loader'
import Footer from '../../Components/Footer'

import withCountdown from '../../HOC/withCountdown'
import withToast from '../../../Common/HOC/withToast'
import { IStore } from '../../../Common/Redux/types'
import {
  selectFinalSelected,
  selectQuantity,
  deselectionPrice,
  setFinalDestination
} from '../../../Common/Redux/Services/trips'
import { buyTickets } from '../../Utils/api'
import { IBuyData } from '../../Utils/apiTypes'
import { ISuccessValues } from '../../Components/Billing/types'
import { compose } from '../../../Common/HOC/compose'
import { RouteComponentProps } from 'react-router-dom'
import { getFromLS, getOwnerToken, getUserData } from '../../../Common/Utils/helpers'
import ee from '../../Utils/emitter'
import { IResponseError } from '../../../Common/Utils/globalTypes'
import { IFinalSelected } from '../../Utils/appTypes'
import { Steps as StepsEnum } from '../../Containers/Payment/type'
import { IState, IProps } from './type'
import './styles.scss'

class PaymentContainer extends Component<
  RouteComponentProps<{}> & IProps,
  IState
> {
  private interval: any
  readonly state: IState = {
    step: 0,
    remainingTime: '',
    isLoading: false
  }

  componentDidMount() {
    const owner = getFromLS('owner')

    if (!owner || !owner.token) {
      this.props.history.push('/')
    }

    const creatdeDate = moment.utc(owner.createdAt).format()

    this.interval = setInterval(() => {
      this.props.countdown(
        creatdeDate,
        this.props.showSuccess,
        this.props.history.push,
        this.setRemainingTime,
        this.interval
      )
    }, 1000)

    window.scrollTo(0, 0)
  }

  setStep = (step: StepsEnum) => {
    const windowWitdth = window.innerWidth
    if (windowWitdth < 882) {
      window.scrollTo(0, 0)
    }

    this.setState({ step })
  }

  setRemainingTime = (time: string) => {
    this.setState({ remainingTime: time })
  }

  handleSubmit = ({ cardToken, passenger, payment }: ISuccessValues) => {
    const owner = getOwnerToken()

    const birthDate = +moment(
      `${passenger.birthyear}-${padStart(
        `${passenger.birthmonth}`,
        2,
        '0'
      )}-${padStart(`${passenger.birthdate}`, 2, '0')}`
    ).format('x')

    const dataToSubmit: IBuyData = {
      owner,
      creditCardToken: cardToken,
      buyerInfo: {
        email: passenger.email!,
        firstName: passenger.firstName!,
        middleName: passenger.middleName!,
        lastName: passenger.lastName!,
        birthDate,
        phone: `${passenger.countryCode!.id}${passenger.phone!}`,
        address: payment.address!,
        city: payment.city!,
        zipCode: payment.zipCode
      },
      user: getUserData().user.email
    }
    this.setState({ isLoading: true })
    buyTickets(dataToSubmit)
      .then(({ data }: { data: IFinalSelected }) => {
        this.props.setFinalDestination(data)
        this.props.history.push('/destinations/summary')
      })
      .catch((err: IResponseError) => {
        this.setState({ isLoading: false })
        this.props.showError(err)
      })
  }

  onNext = () => {
    ee.emit('SUBMIT')
  }

  render() {
    const { remainingTime, isLoading, step } = this.state
    const { quantity, deselectionPrice } = this.props

    return (
      <>
        <section className="payment_cnt">
          <MainBlock className="payment_cnt_main_block">
            <Title
              text="Fill in your billing information"
              selected={['billing']}
              className="pay-title"
            />
            <Steps />
          </MainBlock>
          <div className="payment_cnt-wrapper">
            <div className="payment_cnt-info">
              {remainingTime ? (
                <p>
                  Remainging time: <span>{remainingTime}</span>
                </p>
              ) : null}
            </div>
            <div className="payment_cnt-billing">
              <Billing
                step={step}
                setStep={this.setStep}
                onSuccess={this.handleSubmit}
              />
            </div>
            <div className="payment_cnt-status">
              <BillingStatus
                step={step}
                setStep={this.setStep}
                onSubmit={this.onNext}
                quantity={quantity}
                deselectionPrice={deselectionPrice}
                tours={this.props.selected}
              />
            </div>
          </div>
          {isLoading ? <Loader /> : null}
          {window.innerWidth > 882 && <Footer />}
        </section>
      </>
    )
  }
}

const composeHOCs = compose(
  PaymentContainer,
  withCountdown,
  withToast
)

const mapStateToProps = (state: IStore) => ({
  quantity: selectQuantity(state),
  selected: selectFinalSelected(state),
  deselectionPrice: deselectionPrice(state)
})

export default connect(
  mapStateToProps,
  { setFinalDestination }
)(composeHOCs)
