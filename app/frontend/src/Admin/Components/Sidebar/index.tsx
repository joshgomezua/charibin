import React from 'react'

import { IProps, IState, ITerritory, COLOR } from './types'
import './styles.scss'
import CalendarDoubleFilter from 'src/App/Components/CalendarDoubleFilter';
import {default as Select} from 'react-dropdown-select'
import data from './data'


class Sidebar extends React.Component<IProps, IState> {

  readonly state: IState = {
    calendarVisible: true,
    selectedColor: COLOR.BLUE
  }

  componentDidMount() {

  }

  handleFiltersChange = (territories: ITerritory[], changeFilter: (filters: string[]) => void) => {
    const filters: string[] = []

    territories.map(territory => {
      if (territory.country === "country") {
        this.setState({selectedColor: COLOR.GREEN})
        data.map(dataTerritory => {
          if (dataTerritory.country !== "country" && dataTerritory.country === territory.label) {
            filters.push(dataTerritory.label)
          }
        })
      } else {
        this.setState({selectedColor: COLOR.BLUE})
        filters.push(territory.label)
      }
    })

    changeFilter(filters)
  }
  
  handleFiltersFromChange = (territories: ITerritory[]) => {
    this.handleFiltersChange(territories, this.props.changeFilterFrom)
  }

  handleFiltersToChange = (territories: ITerritory[]) => {
    this.handleFiltersChange(territories, this.props.changeFilterTo)
  }

  handleChangeDate = (date: Date) => {
    this.props.changeSelectedDate(date)
  }

  clearCalendar = () => {
    this.setState({calendarVisible: false}, this.resetCalendar)
  } 

  resetCalendar = () => {
    this.setState({calendarVisible: true}, () => this.props.handleFetchTicketsByDate)
  }

  render() {

    const {
      calendarVisible,
      selectedColor
    } = this.state

    const {
      selectedDate,
      changeSelectedDate,
      onChange,
      filterFrom,
      filterTo
    } = this.props

    return (
      <div className="spon-sidebar">

        {calendarVisible && (
          <CalendarDoubleFilter 
            selectedDate={selectedDate}
            handleChangeDate={this.handleChangeDate}
            changeSelectedDate={changeSelectedDate}
            onChange={onChange}
            clearCalendar={this.clearCalendar}
            selectRange
          />
        )}
        <div className="spon-sidebar__select">
        <div className="spon-sidebar__select__From">
        <Select
        className="spon-sidebar__select__From"
            multi
            placeholder={'From'}
            options={data} 
            value={filterFrom} 
            onChange={this.handleFiltersFromChange}
            color={selectedColor}
            clearable
          >
          </Select>
        </div>
        <div className="spon-sidebar__select__To">
        <Select 
            multi
            placeholder={'To'} 
            options={data} 
            value={filterTo} 
            onChange={this.handleFiltersToChange}
            color={selectedColor}
            clearable
          >  
          </Select>
        </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
