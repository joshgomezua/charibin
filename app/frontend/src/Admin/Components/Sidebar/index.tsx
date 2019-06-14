import React from 'react'

import Button from '../../../Common/Components/Button'
import MultiSwitch from '../../Components/MultiSwitch'

import { DIRECTION_TYPE, ICity } from '../../Utils/adminTypes'
import { IProps, IState } from './types'
import './styles.scss'
import CalendarDoubleFilter from 'src/App/Components/CalendarDoubleFilter';

class Sidebar extends React.Component<IProps, IState> {

  readonly state: IState = {
    calendarVisible: true,
  }

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

  clearCalendar = () => {
    this.setState({calendarVisible: false}, this.resetCalendar)
  } 

  resetCalendar = () => {
    this.setState({calendarVisible: true})
  }

  render() {

    const {calendarVisible} = this.state

    return (
      <div className="spon-sidebar">
        {calendarVisible && (
          <CalendarDoubleFilter 
          selectedDate={this.props.selectedDate}
          handleChangeDate={this.handleChangeDate}
          changeSelectedDate={this.props.changeSelectedDate}
          onChange={this.props.onChange}
          clearCalendar={this.clearCalendar}
        />
        )}

        <div className="spon-sidebar__input">

        <input type="text" 
        value={this.props.filterFrom} 
        onChange={this.handleFilterFromChange}
        placeholder="From"/>
        <br/>
        <input type="text" 
        value={this.props.filterTo} 
        onChange={this.handleFilterToChange}
        placeholder="To"/>
        </div>
        
        <div className="spon-sidebar__filters">

          
          

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
