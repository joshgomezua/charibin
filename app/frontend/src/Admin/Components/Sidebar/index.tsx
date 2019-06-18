import React from 'react'

import { DIRECTION_TYPE, ICity } from '../../Utils/adminTypes'
import { IProps, IState, ILocation } from './types'
import './styles.scss'
import CalendarDoubleFilter from 'src/App/Components/CalendarDoubleFilter';
import moment from 'moment'
import {default as Select} from 'react-dropdown-select'
import data from './data';

class Sidebar extends React.Component<IProps, IState> {

  readonly state: IState = {
    calendarVisible: true,
    selectedColor: "blue"
  }

  componentDidMount() {
    const filters = this.props.cities.map((city: ICity) => city.name)
    this.props.changeFilters(filters)
  }

  handleFilterChange = (location: ILocation[]) => {
    const filter: string[] = []

    location.map(location => {
      filter.push(location.label)
    })

    this.props.changeFilters(filter)
  }

  handleFilterFromChange = (location: ILocation[]) => {
    const filter: string[] = []

    location.map(locationItem => {
      if (locationItem.country === "country") {
        this.setState({selectedColor: "green"})
        data.map(locationItem2 => {
          if (locationItem2.country !== "country" && locationItem2.country === locationItem.label){
            filter.push(locationItem2.label)
          }
        })
      } else {
        this.setState({selectedColor: "blue"})
        filter.push(locationItem.label)
      }
    })

    this.props.changeFilterFrom(filter)
  }

  handleFilterToChange = (location: ILocation[]) => {
    const filter: string[] = []

    location.map(locationItem => {
      if (locationItem.country === "country") {
        this.setState({selectedColor: "green"})
        data.map(locationItem2 => {
          if (locationItem2.country !== "country" && locationItem2.country === locationItem.label){
            filter.push(locationItem2.label)
          }
        })
      } else {
        this.setState({selectedColor: "blue"})
        filter.push(locationItem.label)
      }
    })

    this.props.changeFilterTo(filter)
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
    console.log("test1")
    this.setState({calendarVisible: false}, this.resetCalendar)
  } 

  resetCalendar = () => {
    console.log("test2")
    this.setState({calendarVisible: true}, ()=> this.props.handleFetchTicketsByDate(moment().toDate()))
  }

  result(params: any) {
    console.log(params);
  }

  render() {

    const {calendarVisible, selectedColor} = this.state

    return (
      <div className="spon-sidebar">
        {calendarVisible && (
          <CalendarDoubleFilter 
          selectedDate={this.props.selectedDate}
          handleChangeDate={this.handleChangeDate}
          changeSelectedDate={this.props.changeSelectedDate}
          onChange={this.props.onChange}
          clearCalendar={this.clearCalendar}
          selectRange
        />
        )}
          <label>From</label>
          <Select
          multi
          options={data} 
          value={this.props.filterFrom} 
          onChange={this.handleFilterFromChange}
          color={selectedColor}
          clearable
          >
          
          </Select>

          <label>To</label>
          <Select 
          multi 
          options={data} 
          value={this.props.filterTo} 
          onChange={this.handleFilterToChange}
          color={selectedColor}
          >  
          </Select>
        
      
      </div>
    )
  }
}

export default Sidebar
