import React from 'react'
import { Slider } from 'antd'
import arrow from '../../../Common/Utils/Media/arrow.svg'
import money from '../../Utils/Media/money.svg'
import calendar from '../../Utils/Media/calendar.svg'
import Calendar from '../Calenadar'
import { IProps, IState } from './types'
import './styles.scss'
import 'antd/lib/slider/style/index.css'

export default class Filters extends React.Component<IProps, IState> {
  readonly state: IState = {
    calendarVisible: false,
    priceVisible: false,
    priceTouched: false
  }

  setDepartureValue = ([start, end]: [Date, Date]) => {
    this.props.onChange({ start, end }, () => {
      this.props.fetchTrips()
    })
  }

  setPriceValue = ([min, max]: [number, number]) => {
    this.setState({ priceTouched: true })
    this.props.onChange({ min, max })
  }

  hanleToggleClendarVisible = () => {
    this.setState((state: IState) => ({
      calendarVisible: !state.calendarVisible
    }))
  }

  handleTogglePriceVisible = () => {
    this.setState((state: IState) => ({
      priceTouched: true,
      priceVisible: !state.priceVisible
    }))
  }

  handleClearFilters = () => {
    this.props.clearDates()
    this.props.clearPrice()
    this.setState({
      calendarVisible: false,
      priceVisible: false,
      priceTouched: false
    })
  }

  render() {
    const { calendarVisible, priceVisible, priceTouched } = this.state
    const {
      filters: { min, max, start, end }
    } = this.props

    const startText = start
      ? new Date(start!.getTime()+(start!.getTimezoneOffset() * 60000)).toDateString().replace(/(^\w+|\d+$)/g, '')
      : 'Departure'
    const endText = end
      ? new Date(end!.getTime()+(end!.getTimezoneOffset() * 60000)).toDateString().replace(/(^\w+|\d+$)/g, '')
      : 'Return'
    const priceText = priceTouched ? `${min} - ${max}` : 'Price'

    return (
      <div className="filters">
        <div className="filters-header">
          <h5 className="filters-title">
            Filters ({+priceTouched + +!!start})
          </h5>

          <button onClick={this.handleClearFilters} className="filters-button">
            Clear filters
          </button>
        </div>
        <button
          className="filters-filter"
          onClick={this.hanleToggleClendarVisible}>
          <div className="filters-inner">
            <svg className="filters-filter-prefix">
              <use xlinkHref={`${calendar}#svg`} />
            </svg>
            <span className="filters-filter-value">
              {startText} - {endText}
            </span>
          </div>
          <img
            className={`filters-filter-suffix${calendarVisible ? ' open' : ''}`}
            src={arrow}
          />
        </button>
        {calendarVisible && (
          <div className="filters-calendar">
            <Calendar onChange={this.setDepartureValue} selectRange />
          </div>
        )}
        <button
          className="filters-filter"
          onClick={this.handleTogglePriceVisible}>
          <div className="filters-inner">
            <span className="filters-filter-prefix">
              <svg>
                <use xlinkHref={`${money}#money`} />
              </svg>
            </span>
            <span className="filters-filter-value">{priceText}</span>
          </div>
          <span
            className={`filters-filter-suffix${priceVisible ? ' open' : ''}`}>
            <img src={arrow} />
          </span>
        </button>
        {priceVisible && (
          <Slider
            className="filters-slider"
            range
            tipFormatter={null}
            min={0}
            max={300}
            value={[min, max]}
            onChange={(v: [number, number]) => this.setPriceValue(v)}
            onAfterChange={this.props.fetchTrips}
          />
        )}
      </div>
    )
  }
}
