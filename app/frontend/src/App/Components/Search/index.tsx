import React, { Component } from 'react'
import { IProps, IState } from './types'
import people from '../../Utils/Media/people.svg'
import arrow from '../../../Common/Utils/Media/arrow.svg'
import arrowRight from '../../../Common/Utils/Media/arrowRight.svg'
import './styles.scss'


export default class Search extends Component<IProps, IState> {
  state = {
    inputValue: this.props.initialValue || '',
    buttons: false,
    tickets: []
  }
  changeInput =  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { setDeparture } = this.props
    e.preventDefault()
    this.setState({ inputValue: e.target.value })
    setDeparture!(e.target.value)
  }

  toggleButtons = () => {
    const { setQuantity } = this.props

    if (setQuantity) {
      this.setState((state: IState) => ({ buttons: !state.buttons }))
    }
  }

  selectDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (this.props.quantity > 1) {
      this.props.setQuantity!(this.props.quantity - 1) 
    }
  }

  selectIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (this.props.quantity < 6) {
      this.props.setQuantity!(this.props.quantity + 1)
    }
  }

  Input = () => {
    const { inputValue } = this.state
    return (
      <div className="search-input">
        <input type="text" value={inputValue} onChange={this.changeInput} />
        <label className={inputValue.length > 0 ? 'dirty' : ''}> 
          DEPARTURE CITY
        </label>
      </div>
    )
  }

  Button = () => {
    return (
      <button className="search-button" onClick={this.props.onSubmit}>
        <div>
          <img src={arrowRight} alt="arrow" className="button-arrow" />
        </div>
      </button>
    )
  }

  Select = () => {
    const { buttons } = this.state
    const { quantity } = this.props

    return (
      <div className={`search-select ${buttons ? 'buttons' : ''}`}>
        <img src={people} alt="people" />
        <span>{`${quantity} passenger${quantity > 1 ? 's' : ''}`}</span>
        <button onClick={this.toggleButtons}>
          <img src={arrow} alt="change passanger quantity" />
        </button>
        {buttons && (
          <div>
            <button onClick={this.selectDecrement}>-</button>
            <button onClick={this.selectIncrement}>+</button>
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="search">
        <this.Input />
        <this.Select />
        <this.Button />
      </div>
    )
  }
}
