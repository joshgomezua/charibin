import React from 'react'
import moment from 'moment'
import classnames from 'classnames'
import ReactCalendar from 'react-calendar'
import { IProps, IState } from './types'
import './styles.scss'

class DatePicker extends React.Component<IProps, IState> {
  readonly state: IState = {
    date: undefined,
    isDatePickerVisible: false
  }

  componentDidMount() {
    this.setState({ date: this.props.selectedDate })
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.selectedDate !== this.props.selectedDate) {
      this.setState({
        date: this.props.selectedDate,
        isDatePickerVisible: false
      })
    }
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true })
  }

  toggleShowDatePicker = () => {
    this.setState((state: IState) => ({
      isDatePickerVisible: !state.isDatePickerVisible
    }))
  }

  handleSelectDate = (date: Date): void => {
    this.setState({
      isDatePickerVisible: false,
      date
    })
    this.props.onChange(date)
  }

  render() {
    const { isDatePickerVisible, date } = this.state
    const { label, placeholder, className, selectedDate, isInTicketModal } = this.props

    const datepickerClass = classnames('spon-datepicker', {
      [`${className}`]: className
    })
    const datepickerElementClass = classnames('spon-datepicker__element', {
      'spon-datepicker__element--active': isDatePickerVisible
    })

    const datepickerDropdownClass = classnames('spon-datepicker__picker', {
      'spon-datepicker__picker--active': isDatePickerVisible
    })

    return (
      <div className={datepickerClass}>
        <p className="spon-datepicker__label">{label}</p>
        <div className={datepickerElementClass}>
          <div
            className="spon-datepicker__placeholder"
            onClick={this.toggleShowDatePicker}>
            <p>{date ? moment(date).format('DD.MM.YYYY') : placeholder}</p>
          </div>
          <div className={datepickerDropdownClass}>
            <ReactCalendar
              value={this.state.date}
              onChange={this.handleSelectDate}
              minDate={ isInTicketModal ? new Date : (selectedDate ? selectedDate : new Date())}
              formatShortWeekday={value => moment(value).format('dd')}
              showNeighboringMonth={false}
              next2Label={null}
              prev2Label={null}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default DatePicker
