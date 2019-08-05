import React from 'react'
import Title from '../Title'
import BlueButton from '../BlueButton'
import { IProps } from './types'
import { ISelectedData } from '../../Utils/appTypes'
import arrow from '../../../Common/Utils/Media/arrow.svg'
import { Steps } from '../../Containers/Payment/type'
import './styles.scss'

const Bilingstatus: React.SFC<IProps> = ({
  tours,
  deselectionPrice,
  quantity,
  step,
  setStep,
  onSubmit
}) => {
  const isPayment = Boolean(step)
  const approxPriceMin = Math.min(
    ...tours.map((item: ISelectedData) => item.adultPrice)
  )

  const approxPriceMax = Math.max(
    ...tours.map((item: ISelectedData) => item.adultPrice)
  )

  return (
    <>
      <div className="billing_status">
        <Title
          className="billing_status-title"
          text="You will be billed for one of these destinations randomly:"
          selected={['randomly:']}
        />
        <div className="billing_status-tours">
          {tours.map(({ destination, adultPrice }, i) => (
            <p className="billing_status-tour" key={i}>
              <span>{destination.name}</span>
              <span>
                {`£ ${adultPrice} for ${quantity.Adult} ${
                  quantity.Adult > 1 ? ' passengers' : ' passenger'
                }`}
              </span>
            </p>
          ))}
          <div className="billing_status-deselected">
            <span>Deselection</span>
            <span>+ £ {deselectionPrice}</span>
          </div>
          <div className="billing_status-total">
            <span>Approx Total</span>
            <span>
              {`
                Between £ 
                ${
                  deselectionPrice > 0
                    ? (approxPriceMin + deselectionPrice).toFixed(2)
                    : approxPriceMin.toFixed(2)
                }
                and £ 
                ${
                  deselectionPrice > 0
                    ? (approxPriceMax + deselectionPrice).toFixed(2)
                    : approxPriceMax.toFixed(2)
                }`}
            </span>
          </div>
          <div className="billing_status-info">All sales are final</div>
        </div>
      </div>
      <div className="billing_status-submit">
        <BlueButton
          children={[isPayment ? 'MAKE PAYMENT' : 'CONTINUE TO PAYMENT INFO']}
          onClick={() => onSubmit()}
        />
        {isPayment && (
          <button
            className="billing-submit-back"
            onClick={() => setStep(Steps.TravellerInfo)}>
            <img src={arrow} />
            EDIT TRAVELERS INFO
          </button>
        )}
      </div>
    </>
  )
}

export default Bilingstatus
