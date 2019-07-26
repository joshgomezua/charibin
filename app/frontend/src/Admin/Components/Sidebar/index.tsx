import React from 'react'

import { IProps, IState, ITerritory, COLOR, IOptions, IOption } from './types'
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
        filter.map(dataTerritory => {
          if (dataTerritory.country !== "country" && dataTerritory.country === territory.label) {
            filters.push(dataTerritory.label)
          }
        })
      } else {
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
  
  isCountry = (option: any) => {
    return option.item.country && option.item.country === 'country';
  }
  
  customItemRenderer = (option: IOptions) => 
    (<StyledItem 
      color={this.isCountry(option) ? '#4142a6' : '#dbdcf1'}
    >
      <div onClick={() => {option.methods.addItem(option.item)}}>
      <input type="checkbox" checked={option.methods.isSelected(option.item)} />
        <span id='country'>{(this.isCountry(option) ? 'Country ' : option.item.country) || 'Carrier'} </span> 
        <span id='label'>&emsp;<b>{option.item.label}</b>
        </span>
      </div>
    </StyledItem>);


  customOptionRenderer = (option: IOption) => (
    <StyledOption color={option.item.country && (option.item.country === 'country') ? '#4142a6' : '#dbdcf1'} >
      {option.item.label}
      <span
        onClick={() => option.methods.removeItem(null, option.item)}
        title="please don't 🥺"
      >
        &times;
      </span>
    </StyledOption>
  );

  customContentRenderer = (option: IOptions) =>
    option.state.loading ? (
      <div>Loading...</div>
    ) : (
      <StyledContent>
         {option.state.values.length ? option.state.values.map((item: any) => {
           const options: IOption = {
             item: item,
             props: option.props,
             state: option.state,
             methods: option.methods
           }
           option.props.searchable = true;
           return option.props.optionRenderer(options)
         }) : (
            <div className='placeholder'>{option.props.placeholder}</div>
          )}
      </StyledContent>
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
            itemRenderer={this.customItemRenderer}
            optionRenderer={this.customOptionRenderer}
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
            searchable
            itemRenderer={this.customItemRenderer}
            optionRenderer={this.customOptionRenderer}
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
            searchable
            itemRenderer={this.customItemRenderer}
            optionRenderer={this.customOptionRenderer}
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


const StyledContent = styled.div`
  padding: 2px;
  color: #555;
  border-radius: 3px;
  margin: 3px;
  cursor: pointer;
  height: 50px; 
  width: 100%; 
  overflow-y: scroll;
  .placeholder {
    position: relative;
    top: 20%;
  }
`;

const StyledItem = styled.div`
  border-radius: 5px 5px 5px 5px;
  padding: 10px;
  
  :hover {
    background: #eaeded;
  }
  
  cursor: pointer;

  span#label {
    color: #2e4053;
  }

  span#country {
    padding: 5px;
    color: white;
    background: ${(props: any) => props.color};
    border-radius: 5px;
    box-shadow 5px 10pxs: 
  }

  div#tab {
    white-space: pre;
  }

  span#space {
    margin: 0 5 0 5;
  }
  
`;

const StyledOption = styled.span`
  padding: 3px 10px;
  color: white;
  border-radius: 3px;
  margin: 3px;
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  background-color: ${(props: any) => props.color};
  border: 1px solid;
  transition: all 1s ease-in;

  span {
    display: none;
    transition: all 1s ease-in;
  }

  :hover {
    span {
      display: inline;
      margin: 0 0 0 5px;
      color: white;
    }
  }
`;

export default Sidebar
