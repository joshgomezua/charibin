import React from 'react'
import moment from 'moment'

import Loading from '../../../Common/Components/Loader'
import AgendaItem from '../AgendaItem'
import Button from '../../../Common/Components/Button'

import { MODAL_TYPE } from '../../Utils/adminTypes'
import { IProps, IState, SORT_TYPE, SORT_STATE, SORT_PROPERTY } from './types'
import './styles.scss'
import Pagination from 'src/App/Components/Pagination';
import { ITicket } from 'src/Common/Utils/globalTypes';
import _ from 'lodash';

class Agenda extends React.Component<IProps, IState> {

  readonly state: IState = {
    header: SORT_STATE.DEFAULT,
    sortType: SORT_TYPE.NONE,
    changedSort: false,
    sortProperty: SORT_PROPERTY.DATE,
    isReversed: false
  }

  handlePaginationOnClick = (page: number) => {
    this.props.handlePaginationClick(page)
  }

  
  prepareRows = () => {
    const {
      tickets, 
      filters, 
      changeActiveState, 
      openEditModal, 
      openModal
    } = this.props

    const {sortType, sortProperty, isReversed} = this.state
    if (filters.length === 0) {
      return null
    } else {
      let ticketsTemp: ITicket[] = [...tickets]
      if (
        sortType === SORT_TYPE.FROM ||
        sortType === SORT_TYPE.TO ||
        sortType === SORT_TYPE.CARRIER ||
        sortType === SORT_TYPE.TYPE
      ) {
        ticketsTemp = this.filterString(tickets, sortProperty, isReversed)
      }
      else if (sortType === SORT_TYPE.SOLD_TICKETS) {
        ticketsTemp = this.filterNumber(tickets, sortProperty, isReversed)
      }
      else if (sortType === SORT_TYPE.TIME_OF_DEPARTURE ) {
        ticketsTemp = this.filterDate(tickets, sortProperty, false, isReversed)
      }
      else if (sortType === SORT_TYPE.DATE || sortType === SORT_TYPE.NONE) {
        ticketsTemp = this.filterDate(tickets, sortProperty, true, isReversed)
        const filtered = ticketsTemp
        const segregated = filtered.reduce((acc, ticket: ITicket) => {
          const day = moment.utc(ticket.date.start).format('Y:M:D')
          if (day in acc) {
            acc[day].push(ticket)
          } else {
            acc[day] = [ticket]
          }
          return acc
        }, {})

        const row = Object.keys(segregated).map(key => {
          return segregated[key].map((ticket: ITicket, index: number) => (
            <AgendaItem
              key={index}
              ticket={ticket}
              index={index}
              rowSpan={segregated[key].length}
              changeActiveState={changeActiveState}
              openTicket={openEditModal}
              openModal={openModal}
            />
          ))
        })
        return row
      }

      return ticketsTemp.map((ticket, index) => {
        return(
        <AgendaItem
            key={index}
            ticket={ticket}
            index={0}
            rowSpan={1}
            changeActiveState={changeActiveState}
            openTicket={openEditModal}
            openModal={openModal}
          />
        )
      })
    }
  }

  filterString = (tickets: ITicket[], filter: string, isReversed: boolean) => {
    let tempTickets =  [...tickets]
    let sortedTickets = []
    if (!isReversed) {
      sortedTickets = tempTickets.sort((a: any, b: any) => {
        if(a[filter].toLowerCase() < b[filter].toLowerCase()) { return -1; }
        if(a[filter].toLowerCase() > b[filter].toLowerCase()) { return 1; }
        return 0;
      })
    } else {
      sortedTickets = tempTickets.sort((a: any, b: any) => {
        if(a[filter].toLowerCase() > b[filter].toLowerCase()) { return -1; }
        if(a[filter].toLowerCase() < b[filter].toLowerCase()) { return 1; }
        return 0;
      })
    }
    return sortedTickets
  }

  filterDate = (tickets: ITicket[], filter: string, isDate: boolean, isReversed: boolean) => {
    let tempTickets =  [...tickets]
    let sortedTickets = []
    if (!isReversed) {
      sortedTickets = tempTickets.sort((a: any, b: any) => {
        const am = isDate ? (a[filter].start): moment.utc(a[filter].start).format('HH:mm')
        const bm = isDate ? (b[filter].start) : moment.utc(b[filter].start).format('HH:mm')
        if(am.toLowerCase() < bm.toLowerCase()) { return -1; }
        if(am > bm.toLowerCase()) { return 1; }
        return 0;
      })
    } else {
      sortedTickets = tempTickets.sort((a: any, b: any) => {
        const am = isDate ? (a[filter].start) : moment.utc(a[filter].start).format('HH:mm')
        const bm = isDate ? (b[filter].start) : moment.utc(b[filter].start).format('HH:mm')
        if(am.toLowerCase() > bm.toLowerCase()) { return -1; }
        if(am.toLowerCase() < bm.toLowerCase()) { return 1; }
        return 0;
      })
    }
    return sortedTickets
  }

  filterNumber = (tickets: ITicket[], filter: string, isReversed: boolean) => {
    let tempTickets =  [...tickets]
    let sortedTickets = []
    if (!isReversed) {
      sortedTickets = tempTickets.sort((a: any, b: any) => {
        if(a[filter] < b[filter]) { return -1; }
        if(a[filter] > b[filter]) { return 1; }
        return 0;
      })
    } else {
      sortedTickets = tempTickets.sort((a: any, b: any) => {
        if(a[filter] > b[filter]) { return -1; }
        if(a[filter] < b[filter]) { return 1; }
        return 0;
      })
    }
    return sortedTickets
  }

  updateSortType = () => {
    const {header} = this.state

    if (header === SORT_STATE.DEFAULT) {
      this.setState({header: SORT_STATE.BOT})
    }
    else if (header === SORT_STATE.BOT) {
      this.setState({header: SORT_STATE.TOP})
    }
    else if (header === SORT_STATE.TOP) {
      this.setState({header: SORT_STATE.BOT})
    }
  }

  setSort = async (sortType: SORT_TYPE, sortProperty: SORT_PROPERTY) => {
    if (this.state.sortType !== sortType) {
      await this.setState({
        sortType: sortType,
        header: SORT_STATE.DEFAULT,
        sortProperty: sortProperty,
        isReversed: false
      })
    } else {
      await this.setState(prevState => ({
        isReversed: !prevState.isReversed
      }))
    }    
    this.updateSortType()
  }

  render() {
    const {
    tickets,
    openModal,
    loading,
    error,
    retry,
    filters,
    pagination,
    } = this.props

    const {
      sortType,
      header
    } = this.state
    return (
      <table className="spon-agenda">
        <thead key="thead" className="spon-agenda__thead">
          <tr className="spon-agenda__row  spon-agenda__row--head">
            <th onClick={()=>this.setSort(SORT_TYPE.DATE, SORT_PROPERTY.DATE)} className={sortType === SORT_TYPE.DATE ? header : SORT_STATE.DEFAULT}>
              Date
            </th>
            <th onClick={()=>this.setSort(SORT_TYPE.TIME_OF_DEPARTURE, SORT_PROPERTY.TIME_OF_DEPARTURE)} className={sortType === SORT_TYPE.TIME_OF_DEPARTURE ? header : SORT_STATE.DEFAULT}>
              Time of departure
            </th>
            <th className="spon-agenda__cell spon-agenda__cell--head">
              Time of Arrival
            </th>
            <th onClick={()=>this.setSort(SORT_TYPE.FROM, SORT_PROPERTY.FROM)} className={sortType === SORT_TYPE.FROM ? header : SORT_STATE.DEFAULT}>From</th>
            <th onClick={()=>this.setSort(SORT_TYPE.TO, SORT_PROPERTY.TO)} className={sortType === SORT_TYPE.TO ? header : SORT_STATE.DEFAULT}>To</th>
            <th onClick={()=>this.setSort(SORT_TYPE.CARRIER, SORT_PROPERTY.CARRIER)} className={sortType === SORT_TYPE.CARRIER ? header : SORT_STATE.DEFAULT}>Carrier</th>
            <th onClick={()=>this.setSort(SORT_TYPE.TYPE, SORT_PROPERTY.TYPE)} className={sortType === SORT_TYPE.TYPE ? header : SORT_STATE.DEFAULT}>Type</th>
            <th className="spon-agenda__cell spon-agenda__cell--head">
              Prices
            </th>
            <th className="spon-agenda__cell spon-agenda__cell--head">
              Qty of tickets
            </th>
            <th className="spon-agenda__cell spon-agenda__cell--head">
              Available tickets
            </th>
            <th onClick={()=>this.setSort(SORT_TYPE.SOLD_TICKETS, SORT_PROPERTY.SOLD_TICKETS)} className={sortType === SORT_TYPE.SOLD_TICKETS ? header : SORT_STATE.DEFAULT}>
              Sold tickets
            </th>
            
            <th className="spon-agenda__cell spon-agenda__cell--head">Active</th>
            <th className="spon-agenda__cell spon-agenda__cell--head">
              <Button
                className="spon-agenda__add-button"
                variant="blue"
                icon="plus"
                text="ADD NEW"
                onClick={() =>
                  openModal(MODAL_TYPE.ADD_TICKET, 'Create ticket', '')
                }
              />
            </th>
          </tr>
        </thead>
        <tbody className="spon-agenda__tbody">
          {error && (
            <tr>
              <td colSpan={5}>
                <div className="spon-agenda__error">
                  <p>There was a problem when we tried to find tickets</p>
  
                  <Button
                    onClick={retry}
                    text="Retry"
                    variant="gray"
                    className="has-margin-top-small"
                  />
                </div>
              </td>
            </tr>
          )}
  
          {filters.length === 0 &&
            tickets.length > 0 && (
              <tr>
                <td colSpan={5}>
                  <div className="spon-agenda__error">
                    <p>You have to check at least one filter</p>
                  </div>
                </td>
              </tr>
            )}
  
          {loading && (
            <tr>
              <td colSpan={5}>
                <div className="spon-agenda__error">
                  <Loading isStatic />
                </div>
              </td>
            </tr>
          )}
          {tickets.length === 0 &&
            !loading && (
              <tr>
                <td colSpan={5}>
                  <div className="spon-agenda__error">
                    <p>No tickets available for this month.</p>
                  </div>
                </td>
              </tr>
            )}
          {!loading && !error && tickets.length > 0 && this.prepareRows() 
          }
        </tbody>
        <tfoot>
        <tr className="spon-agenda__pagination">
              <td>
                <div >
                  <Pagination 
                    pagination={pagination}
                    onChange={this.handlePaginationOnClick}
                  />
                </div>
              </td>
            </tr>
        </tfoot>
      </table>
    )
  }
}


export default Agenda
