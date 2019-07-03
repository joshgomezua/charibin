import React from 'react'
import ReactCalendar from 'react-calendar'
import moment from 'moment'
import arrow from '../../../Common/Utils/Media/arrow.svg'
import './styles.scss'
import { IProps, IState } from './types'

export default class Calendar extends React.Component<IProps, IState> {
  readonly state: IState = {
    startDate: new Date(),
    startFillingEndRange: false
  }

  handleClickSelectRange = (date: Date) => {
    if (!this.state.startFillingEndRange) {
      this.setState({ startFillingEndRange: true, startDate: date })
    }
  }

  handleChangeEvent = (v: [Date, Date]) => {
    this.props.onChange && this.props.onChange(v)
    this.setState({ startFillingEndRange: false })
  }

  handleDisableDays = (props: { date: Date }) => {
    const { startDates, endDates } = this.props
    const dateString = moment(props.date).format('YYYY-MM-DD')
    //console.log('dateString', dateString)
    if (startDates && !this.state.startFillingEndRange) {
      //console.log(startDates)
      return !startDates.includes(dateString)
    } else if (endDates && this.state.startFillingEndRange) {
      const filteredEndDates = endDates.filter(
        (date: string) => !moment(date).isBefore(this.state.startDate)
      )
      return !filteredEndDates.includes(dateString)
    }

    return false
  }

  render() {
    return (
      <div className="calendar">
        <ReactCalendar
          locale="en-GB"
          formatShortWeekday={value => moment.utc(value).format('dd')}
          showNeighboringMonth={false}
          value={this.props.value}
          onClickDay={this.handleClickSelectRange}
          onChange={this.handleChangeEvent}
          selectRange={this.props.selectRange}
          nextLabel={<img src={arrow} className="calendar-arrow_next" />}
          prevLabel={<img src={arrow} className="calendar-arrow_prev" />}
          next2Label={null}
          prev2Label={null}
          tileDisabled={this.handleDisableDays}
        />
      </div>
      
    )
  }
}
