import React from 'react'
import ReactCalendar from 'react-calendar'
import moment from 'moment'
import { debounce } from 'lodash'

import Button from '../../../Common/Components/Button'
import MultiSwitch from '../../Components/MultiSwitch'
import arrow from '../../../Common/Utils/Media/arrowDown.svg'

import { DIRECTION_TYPE, ICity } from '../../Utils/adminTypes'
import { IProps } from './types'
import './styles.scss'
import CalendarDoubleFilter from 'src/App/Components/CalendarDoubleFilter';

class Sidebar extends React.Component<IProps> {
  componentDidMount() {
    const filters = this.props.cities.map((city: ICity) => city.name)
    this.props.changeFilters(filters)
  }

  handleFilterChange = (name: string, id: string) => {
    const { filters } = this.props
    let newFilters
    if (filters.includes(name)) {
      newFilters = filters.filter((city: string) => {
        return city !== name && city !== ''
      })
    } else {
      newFilters = [...filters, name]
    }

    this.props.changeFilters(newFilters)
  }

  handleFilterFromChange = (event: any) => {
    this.props.changeFilterFrom(event.target.value)
  }

  handleFilterToChange = (event: any) => {
    this.props.changeFilterTo(event.target.value)
  }

  handleMarkAll = (selectAll: boolean) => {
    if (selectAll) {
      const filters = this.props.cities.map((city: ICity) => city.name)
      this.props.changeFilters(filters)
    } else {
      this.props.changeFilters([])
    }
  }

  handleChangeDate = (date: Date) => {
    this.props.changeSelectedDate(date)
  }

  handleSwitchType = (type: DIRECTION_TYPE | null) => {
    this.props.changeDirectionType(type)
  }

  render() {
    const debouncedChange = debounce(
      ({ activeStartDate, view }: { activeStartDate: Date; view: string }) => {
        if (view === 'month') {
          this.handleChangeDate(activeStartDate)
        }
      },
      300
    )

    return (
      <div className="spon-sidebar">
        <ReactCalendar
          calendarType="ISO 8601"
          formatMonthYear={value =>
            moment(value)
              .format('MMMM YYYY')
              .toUpperCase()
          }
          minDetail="year"
          minDate={moment().toDate()}
          nextLabel={<img src={arrow} />}
          prevLabel={<img src={arrow} />}
          value={this.props.selectedDate}
          activeStartDate={this.props.selectedDate}
          onClickMonth={this.handleChangeDate}
          onActiveDateChange={debouncedChange}
        />
        <CalendarDoubleFilter 
          selectedDate={this.props.selectedDate}
          handleChangeDate={this.handleChangeDate}
          changeSelectedDate={this.props.changeSelectedDate}
        />
        <div className="spon-sidebar__filters">
          <h4>Filtres</h4>

          <div className="spon-sidebar__input">
            <label>
              From
              <input type="text" value={this.props.filterFrom} onChange={this.handleFilterFromChange}/>
            </label>

            <label>
              To
              <input type="text" value={this.props.filterTo} onChange={this.handleFilterToChange}/>
            </label>
          </div>
          

          <h4>Cities</h4>

          <div className="spon-sidebar__buttons">
            <Button
              variant="adminSecondary"
              disabled={this.props.filters.length === 0}
              className="spon-sidebar__button"
              onClick={() => this.handleMarkAll(false)}
              text="Deselect all"
            />

            <Button
              variant="adminSecondary"
              disabled={this.props.filters.length === this.props.cities.length}
              className="spon-sidebar__button"
              onClick={() => this.handleMarkAll(true)}
              text="Select all"
            />
          </div>

          <div className="spon-sidebar__cities">
            <MultiSwitch
              className="spon-sidebar__switcher"
              selectedValues={this.props.filters}
              isMulti
              coloredNames
              items={this.props.cities}
              onChange={(value: string, id: string) =>
                this.handleFilterChange(value, id)
              }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
