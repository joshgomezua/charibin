import React from 'react'
import MainBlock from '../MainBlock'
import Title from '../Title'
import { IProps } from './types'
import './styles.scss'

const Summary: React.SFC<IProps> = ({
  selected,
  quantity,
  deselectionPrice
}) => (
  <MainBlock className="trip" nonFlex>
    <section className="trip-left">
      <p className="trip-left-order">order #{selected.chargeId}</p>
      <Title
        className="trip-left-title"
        selected={[selected.name]}
        text={`Congratulations! Pack your stuff to ${selected.name}`}
        left
      />
      <p className="trip-left-confirmation">
        A confirmation has been sent to your email
      </p>
      <p className="trip-left-confirmation last">
        Your tickets will be issued within 24 hours.
      </p>
      <p className="trip-left-email">{selected.email}</p>
    </section>
    <section className="trip-right">
      <div className="trip-right-img">
        <img src={selected.photo} alt="image" />
      </div>
      <p className="trip-right-details">Here is your order details: </p>
      <div className="trip-right-name">
        <span>{selected.name}</span>
        <span>
          {`£ ${selected.finalCost * (quantity.Adult + quantity.Youth) - deselectionPrice}
          for ${quantity.Adult + quantity.Youth} ${quantity.Adult + quantity.Youth > 1 ? 'passengers' : 'passenger'}`}
        </span>
      </div>
      <div className="trip-right-deselect">
        <span>Deselection</span>
        <span>+ £ {deselectionPrice}</span>
      </div>
      <div className="trip-right-total">
        <span>Total</span>
        <span>
          {`£ ${(selected.finalCost * (quantity.Adult + quantity.Youth)).toFixed(2)}
          for ${quantity.Adult + quantity.Youth} ${quantity.Adult > 1 || quantity.Youth > 1 ? 'passengers' : 'passenger'}`}
        </span>
      </div>
    </section>
  </MainBlock>
)

export default Summary
