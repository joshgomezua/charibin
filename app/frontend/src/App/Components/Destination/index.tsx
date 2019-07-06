import React, { Component } from 'react'
import * as moment from 'moment'
import { IDuration } from '../../../Common/Utils/globalTypes'
import 'moment-duration-format'

import Calendar from '../Calenadar'
import Button from '../../../Common/Components/Button'
import Dropdown from '../Dropdown'

import { IProps, IState } from './types'
import './styles.scss'
import { ITicket } from '../../../Common/Utils/globalTypes'
import {
  ISelectedData,
  ITrip as ITripSelect
} from '../../../App/Utils/appTypes'
import { IOption } from '../Dropdown/types'
import { getDestinationTickets } from 'src/Admin/Utils/api';
import { getToken } from 'src/Common/Utils/helpers';
// import { ERRORS } from 'src/Common/Utils/constants';



export default class Destination extends Component<IProps, IState> {
  readonly state: IState = {
    calendar: false,
    error: {
      state: false,
      msg: ''
    },
    dates: {
      start: null,
      end: null
    },
    hours: {
      start: null,
      end: null
    },
    hoursToSelect: {
      start: [],
      end: []
    },
    startDates: [],
    endDates: []
  }

  componentDidMount = () => {
    const { data } = this.props
    const token = getToken() 
    
    this.getTickets(data.departure, data.destination, token, 'startDates')
    this.getTickets(data.destination, data.departure, token, 'endDates')

  }

  getTickets = (departure: string, destination: string, token: string, datePoint: string) => {
    let dates: string[] = []
    let returnedDates = {}

    getDestinationTickets(departure, destination, token)
      .then(res => {
        dates = res.data.map((item: ITicket) => moment.utc(item.date.start).format('YYYY-MM-DD'))
        
        returnedDates[datePoint] = dates
        this.setState( returnedDates )
      })
  }

  CalendarBlock = () => {
    const {
      error,
      hours,
      hoursToSelect: { start, end },
    } = this.state
    const { data, /*quantity*/ } = this.props
    const HOURS_SET_PRICE = process.env.REACT_APP_TICKET_CHOOSE_TIME_PRICE

    const startDates =
      data.type === 'trip'
        ?             
        this.state.startDates
        : []
    const endDates =
      data.type === 'trip'
        ? 
        this.state.endDates
        : []

    return (
      <div className="destination-calendar">
        <Calendar
          selectRange
          startDates={startDates}
          endDates={endDates}
          onChange={this.handleSelectDates}
        />

        {error.state ? (
          <div className="destination-calendar-error">{error.msg}</div>
        ) : null}

        {start.length > 0 && end.length > 0 ? (
          <div className="destination-calendar-dropdowns">
            <p className="heading">
              You can select trip hours for extra price (+ £{HOURS_SET_PRICE})
            </p>
            <Dropdown
              label="Departure hours"
              id="start"
              placeholder="Select"
              options={start}
              selectedValue={hours.start!}
              onChange={this.handleSelectHour}
            />

            <Dropdown
              label="Return hours"
              id="end"
              placeholder="Select"
              options={end}
              selectedValue={hours.end!}
              onChange={this.handleSelectHour}
            />
          </div>
        ) : null}

        <div className="destination-calendar-bottom">
          <Button text="select" onClick={this.select} variant="blue-select" />
          <Button
            text="clear dates"
            variant="gray"
            icon="cross"
            onClick={this.deselect}
          />
        </div>
      </div>
    )
  }

  setInitialState = () => {
    this.setState({
      calendar: false,
      dates: {
        start: null,
        end: null
      },
      hours: {
        start: null,
        end: null
      },
      hoursToSelect: {
        start: [],
        end: []
      }
    })
  }

  setError = (msg: string) => {
    this.setState(
      {
        error: { state: true, msg }
      },
      () =>
        setTimeout(() => {
          this.setState({ error: { state: false, msg: '' } })
        }, 5000)
    )
  }

  select = () => {
    const { dates, hours } = this.state
    const { onSelect } = this.props
    const data = this.props.data as ITripSelect
    const offset = moment(dates.start!).utcOffset()

    if (dates.start && dates.end) {
      const selectedData: ISelectedData = {
        tripId: data._id,
        deselectionPrice: data.deselectionPrice,
        discount: data.discount,
        duration: data.duration,
        name: data.name,
        photo: data.photo,
        price: data.price,
        departure: data.departure,
        destination: data.destination,
        type: 'selectedTrid',
        dateStart: +moment.utc(dates.start).add(offset, 'minutes'),
        dateEnd: +moment
          .utc(dates.end)
          .add(offset, 'minutes')
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      }

      if (hours.start && hours.end) {
        selectedData.arrivalTicket = hours.start.id
        selectedData.departureTicket = hours.end.id
      }

      onSelect && onSelect(selectedData)
      this.closeCalendar()
    } else {
      this.setError('You need to select start and end dates')
    }
  }

  deselect = () => {
    const { data } = this.props
    if (data.type === 'selectedTrid') {
      this.props.onDeselect && this.props.onDeselect(data)
    } else {
      this.props.onDeselect && this.props.onDeselect(this.props.index)
    }

    this.setInitialState()
    this.closeCalendar()
  }

  openCalendar = () => {
    const { onCalendarOpen } = this.props
    onCalendarOpen && onCalendarOpen()
    this.setState({ calendar: true })
  }

  closeCalendar = () => {
    const { onCalendarClose } = this.props
    onCalendarClose && onCalendarClose()
    this.setState({ calendar: false })
  }

  handleSelectDates = (dates: [Date, Date]) => {
    const { tickets, departure, destination } = this.props.data as ITripSelect
    const offset = moment(dates[0]).utcOffset()

    const hours = tickets.reduce(
      (total, ticket: ITicket) => {
        const isStartSameFirst = moment(
          moment.utc(ticket.date.start).format('YYYY-MM-DD')
        ).isSame(
          moment
            .utc(dates[0])
            .add(offset, 'minutes')
            .format('YYYY-MM-DD')
        )       

        const isStartSameSecond = moment(
          moment.utc(ticket.date.start).format('YYYY-MM-DD')
        ).isSame(
          moment
            .utc(dates[1])
            .add(offset, 'minutes')
            .format('YYYY-MM-DD')
        )

        if (isStartSameFirst && ticket.departure === departure && ticket.destination === destination) {
          total.start.push({
            id: ticket._id,
            name: `${moment
              .utc(ticket.date.start)
              .format('HH:mm')} - ${moment
              .utc(ticket.date.end)
              .format('HH:mm')}`
          })
        } else if (isStartSameSecond && ticket.departure === destination && ticket.destination === departure) {
          total.end.push({
            id: ticket._id,
            name: `${moment
              .utc(ticket.date.start)
              .format('HH:mm')} - ${moment
              .utc(ticket.date.end)
              .format('HH:mm')}`
          })
        }
        return total
      },
      { start: [], end: [] } as { start: IOption[]; end: IOption[] }
    )

    this.setState({
      dates: {
        start: dates[0],
        end: dates[1]
      },
      hours: {
        start: null,
        end: null
      },
      hoursToSelect: {
        start: hours.start,
        end: hours.end
      }
    })
  }

  handleSelectHour = (data: {
    id: string
    value: { id: string; name: string }
  }) => {
    this.setState((state: IState) => ({
      hours: {
        ...state.hours,
        [data.id]: data.value
      }
    }))
  }

  getTicketsType = (tickets: ITicket[]) => {
    return tickets
      .reduce((types: string[], ticket: ITicket) => {
        if (!types.includes(ticket.type)) {
          return [...types, ticket.type]
        }
        return types
      }, [])
      .sort()
  }

  render() {
    const { selected, deselect, data } = this.props
    const { discount, duration, photo, name, price } = data
    const ticketsTypes = this.getTicketsType(
      data.type === 'trip' ? data.tickets : []
    )
    const { calendar, dates } = this.state

    const durationTime = moment.duration({ minutes: duration }) as IDuration
    const formatedDuration = durationTime.format('h[h] m[m]')

    return (
      <div className={`destination ${calendar ? 'overlay' : ''}`}>
        <div
          className={`destination-top ${selected || deselect ? 'short' : ''}  ${
            calendar ? 'shortest' : ''
          }`}>
          <span>{`SAVE ${discount}%`}</span>
          <img src={photo} alt="bg" />
        </div>
        <div className="destination-bottom">
          <div className="destination-bottom-row">
            {!deselect && (
              <div destination-bottom-types>
                {ticketsTypes.map(
                  (type: string, index: number) =>
                    index !== 0 && (
                      <span
                        key={index}
                        className={`destination-bottom-type ${
                          index === 0
                            ? 'destination-bottom-type--left'
                            : 'destination-bottom-type--right'
                        }`}
                        style={{
                          borderColor: '#12b459',
                          color: '#12b459'
                        }}>
                        {type}
                      </span>
                    )
                )}
              </div>
            )}
            {deselect && (
              <div destination-bottom-types>
                <span
                  className={`destination-bottom-type destination-bottom-type--left`}
                  style={{
                    borderColor: '#12b459',
                    color: '#12b459'
                  }}>
                  Bus
                </span>
                {/* <span
                  className={`destination-bottom-type destination-bottom-type--right`}
                  style={{
                    borderColor: '#12b459',
                    color: '#12b459'
                  }}>
                  Train
                </span> */}
              </div>
            )}
            <p className="destination-bottom-duration">
              approx. {formatedDuration}
            </p>
          </div>
          <p className="destination-bottom-title">{name}</p>
          <p className="destination-bottom-luggage">Luggage included</p>
          <p className="destination-bottom-price">{`£ ${price}/person`}</p>
          {calendar && <this.CalendarBlock />}
          {!selected &&
            !deselect && (
              <Button
                text="SELECT THIS TRIP"
                icon="plus"
                variant="blue"
                disabled={this.props.isMax}
                onClick={this.openCalendar}
              />
            )}
          {selected &&
            !deselect && (
              <>
                <Button
                  text={`selected for ${moment(
                    dates.start
                      ? dates.start
                      : (data as ISelectedData).dateStart
                  ).format('DD MMM')} - ${moment(
                    dates.end ? dates.end : (data as ISelectedData).dateEnd
                  ).format('DD MMM')}`}
                  variant="green"
                />
                <Button
                  text="clear dates"
                  variant="gray"
                  icon="cross"
                  onClick={this.deselect}
                />
              </>
            )}
          {!selected &&
            deselect &&
            data.type === 'selectedTrid' && (
              <>
                <Button
                  text={`selected for ${moment
                    .utc(data.dateStart)
                    .format('DD MMM')} - ${moment
                    .utc(data.dateEnd)
                    .format('DD MMM')}`}
                />
                <Button
                  text={`delete for £ ${data.deselectionPrice}`}
                  variant="red"
                  icon="crossWhite"
                  onClick={this.deselect}
                  disabled={this.props.isMax}
                />
              </>
            )}
        </div>
      </div>
    )
  }
}
