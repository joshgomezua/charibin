import React from 'react'
import Button from '../../../Common/Components/Button'
import { default as Select } from 'react-dropdown-select'
import { MODAL_TYPE } from '../../Utils/adminTypes'
import { IProps, IState, COLOR, ITerritory, IOptions, IOption } from './types'
import './styles.scss'
import styled from 'styled-components'

class TripHeader extends React.Component<IProps, IState> {

  readonly state: IState = {
    selectedColor: COLOR.VIOLET,
    option: {
      item: {}, 
      itemIndex: {}, 
      props: {}, 
      state: {}, 
      methods: {}
    }
  }

  handleFiltersChange = (territories: ITerritory[], changeFilter: (filters: string[]) => void) => {
    const filters: string[] = []

    territories.map(territory => {
        this.setState({selectedColor: COLOR.VIOLET})
        filters.push(territory.label)
    })
    
    const uniqueFilters = filters.reduce((unique: any, other: any) => {
      if(!unique.some((label: string) => label === other)) {
        unique.push(other);
      }
      return unique;
    },[]);

   changeFilter(uniqueFilters)
  }
  
  handleFiltersFromChange = (territories: ITerritory[]) => {
    this.handleFiltersChange(territories, this.props.changeFilterFrom)
  }

  handleFiltersToChange = (territories: ITerritory[]) => {
    this.handleFiltersChange(territories, this.props.changeFilterTo)
  }

  customItemRenderer = (option: IOptions) => (
    <StyledItem color={'#dbdcf1'}>
      <div onClick={() => {option.methods.addItem(option.item)}}>
        <input type="checkbox" checked={option.methods.isSelected(option.item)} />{" "}
        {option.item.label}
      </div>
    </StyledItem>
  );

  customOptionRenderer = (option: IOption) => (
    <StyledOption color={'#5556dc'} >
      {option.item.label}
      <span
        onClick={() => option.methods.removeItem(null, option.item)}
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
           return option.props.optionRenderer(options)
         }) : (
            <div className='placeholder'>{option.props.placeholder}</div>
          )}
      </StyledContent>
    );

  render() {
    const {
      selectedColor,
    } = this.state
  
    const {
      title,
      heading,
      modal,
      handleOpenModal,
      handleBulkChange,
      filterFrom,
      filterTo,
      availableDepartures,
      availableDestinations
    } = this.props

    let departureList: ITerritory[] = [];
    for(let index: number = 0; index < availableDepartures.length; index++){
      const option: any = {
        value: index,
        label: availableDepartures[index]
      }
      departureList.push(option) 
    }

    let destinationList: ITerritory[] = [];
    for(let index: number = 0; index < availableDestinations.length; index++){
      const option: any = {
        value: index,
        label: availableDestinations[index]
      }
      destinationList.push(option) 
    }

    return (
      <div className="spon-admin-trip-header">
        
        <div className="spon-admin-trip-header__inner">
          <h1 className="spon-admin-trip-header__heading">{title}</h1>
        </div> 

        <div className="spon-admin-trip-header__select">
          <div className="spon-admin-trip-header__select__From">
            <Select  className="spon-admin-trip-header__select__From"
              multi
              itemRenderer={this.customItemRenderer}
              optionRenderer={this.customOptionRenderer}
              contentRenderer={this.customContentRenderer}
              placeholder={'From'}
              options={departureList} 
              value={filterFrom} 
              onChange={this.handleFiltersFromChange}
              color={selectedColor}
              clearable
            >
            </Select>
          </div>
          <div className="spon-admin-trip-header__select__To">
            <Select className="spon-admin-trip-header__select__To"
              multi
              itemRenderer={this.customItemRenderer}
              optionRenderer={this.customOptionRenderer}
              contentRenderer={this.customContentRenderer}
              placeholder={'To'} 
              options={destinationList} 
              value={filterTo} 
              onChange={this.handleFiltersToChange}
              color={selectedColor}
              clearable
              >  
            </Select>
          </div>
        </div>

        <Button
          className="spon-admin-trip-header__bulk-button"
          variant="blue"
          icon="pencil"
          text="BULK"
          onClick={() => handleBulkChange()}
        />

        {(handleOpenModal && heading && modal) ? (
          <Button
            className="spon-admin-trip-header__add-button"
            variant="blue"
            icon="plus"
            text="ADD NEW"
            onClick={() => handleOpenModal(modal, heading)}
          />
        ) : handleOpenModal ? (
            <Button
              className="spon-admin-trip-header__add-button"
              variant="blue"
              icon="plus"
              text="ADD NEW"
              onClick={() => handleOpenModal(MODAL_TYPE.ADD_TRIP, 'Create trip')}
            />
        ) : null}

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
  height: 2.9rem; 
  width: 100%; 
  overflow-y: scroll;
  .placeholder {
    position: relative;
    top: 20%;
  }
`;

const StyledItem = styled.div`
  color: #555;
  border-radius: 3px;
  margin: 3px;
  cursor: pointer;
  background: ${(props: any) => props.color} ;
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
export default TripHeader

