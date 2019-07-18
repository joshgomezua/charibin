import React from 'react'

import { IProps, IState, ITerritory, COLOR, IOptions } from './types'
import './styles.scss'
import CalendarDoubleFilter from 'src/App/Components/CalendarDoubleFilter';
import {default as Select} from 'react-dropdown-select'
import { getTicketFilters } from 'src/Admin/Utils/api';
import { getToken } from 'src/Common/Utils/helpers';
import styled from 'styled-components'


class Sidebar extends React.Component<IProps, IState> {

  readonly state: IState = {
    calendarVisible: true,
    selectedColor: COLOR.BLUE,
    filtersFrom: [],
    filtersTo: [],
    filtersCarrier: [],
    option: {
      item: {}, 
      itemIndex: {}, 
      props: {}, 
      state: {}, 
      methods: {}
    }
  }

  componentDidMount() {
    this.getTicketFilters()
  }

  getTicketFilters = () => {
    const token = getToken()
    getTicketFilters(token)
      .then(async({data}) => {
        console.log('data2', data)
        await this.setState({
          filtersFrom: data.departures,
          filtersTo: data.destinations,
          filtersCarrier: data.carriers
        })
      })
  }

  handleFiltersChange = (territories: ITerritory[], filter: ITerritory[], changeFilter: (filters: string[]) => void) => {
    const filters: string[] = []

    territories.map(territory => {
      if (territory.country === "country") {
        this.setState({selectedColor: COLOR.GREEN})
        filter.map(dataTerritory => {
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
    this.handleFiltersChange(territories, this.state.filtersFrom, this.props.changeFilterFrom)
  }

  handleFiltersToChange = (territories: ITerritory[]) => {
    this.handleFiltersChange(territories, this.state.filtersTo, this.props.changeFilterTo)
  }

  handleFiltersCarrierChange = (carriers: any[]) => {
    const carriersToSend =  []
    for (let carrier of carriers) {
      carriersToSend.push(carrier.label)
    }
    this.props.changeFilterCarrier(carriersToSend)
  }

  handleChangeDate = (date: Date) => {
    this.props.changeSelectedDate(date)
  }

  clearCalendar = () => {
    this.setState({calendarVisible: false}, this.resetCalendar)
  } 

  resetCalendar = () => {
    this.setState({calendarVisible: true}, () => this.props.handleFetchTicketsByDate())
  }
  
  
  customItemRenderer = (option: IOptions) => (
    <StyledItem>
      <div onClick={() => option.methods.addItem(option.item)}>
        <input type="checkbox" checked={option.methods.isSelected(option.item)} />{" "}
        {option.item.label}
      </div>
    </StyledItem>
  );

  render() {

    const {
      calendarVisible,
      selectedColor,
      filtersFrom,
      filtersTo,
      filtersCarrier
    } = this.state

    const {
      selectedDate,
      changeSelectedDate,
      onChange,
      filterFrom,
      filterTo,
      filterCarrier
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
            searchable
            autoFocus
            itemRenderer={this.customItemRenderer}
            placeholder={'From'}
            options={filtersFrom} 
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
            options={filtersTo} 
            value={filterTo} 
            onChange={this.handleFiltersToChange}
            color={selectedColor}
            clearable
          >  
          </Select>
        </div>
        <div className="spon-sidebar__select__Carrier">
        <Select 
            multi
            placeholder={'Carrier'} 
            options={filtersCarrier} 
            value={filterCarrier} 
            onChange={this.handleFiltersCarrierChange}
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

const StyledItem = styled.div`
  padding: 10px;
  color: #555;
  border-radius: 3px;
  margin: 3px;
  cursor: pointer;

  :hover {
    background: #f2f2f2;
  }
`;

export default Sidebar
