import React from 'react'
import moment from 'moment'

import Loading from '../../../Common/Components/Loader'
import AgendaItem from '../AgendaItem'
import Button from '../../../Common/Components/Button'

import { MODAL_TYPE } from '../../Utils/adminTypes'
import { ITicket } from '../../../Common/Utils/globalTypes'
import { IProps, IState, FILTER_TYPE, SORT_STATE } from './types'
import './styles.scss'
import Pagination from 'src/App/Components/Pagination';

class Agenda extends React.Component<IProps, IState> {

  readonly state: IState = {
    header: SORT_STATE.DEFAULT,
    filterType: FILTER_TYPE.NONE,
    changedSort: false
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
    const filtered = tickets
    const segregated = filtered.reduce((acc, ticket: ITicket) => {
      const day = moment.utc(ticket.date.start).format('Y:M:D')
      if (day in acc) {
        acc[day].push(ticket)
      } else {
        acc[day] = [ticket]
      }
      return acc
    }, {})
    console.log('segregated', segregated)
    if (filters.length === 0) {
      return null
    } else {
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
  }

  test = (filter: string) => {
    this.props.filterString(filter)
    this.updateSortType()
  }

  test2 = (filter: string) => {
    this.props.filterNumber(filter)
    this.updateSortType()

  }

  test3 = (filter: string, isDate: boolean) => {
    this.props.filterDate(filter, isDate)
    this.updateSortType()
    
  }

  updateSortType = () => {
    const {header} = this.state
    console.log('update', this.state.header)

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

  setFrom = async () => {
    if (this.state.filterType !== FILTER_TYPE.FROM) {
      await this.setState({
        filterType: FILTER_TYPE.FROM,
        header: SORT_STATE.DEFAULT
      })
    }    
    this.test('departure')
  }

  setTo = async () => {
    if (this.state.filterType !== FILTER_TYPE.TO) {
      await this.setState({
        filterType: FILTER_TYPE.TO,
        header: SORT_STATE.DEFAULT
      })
    }    
    this.test('destination')
  }

  setCarrier = async () => {
    if (this.state.filterType !== FILTER_TYPE.CARRIER) {
      await this.setState({
        filterType: FILTER_TYPE.CARRIER,
        header: SORT_STATE.DEFAULT
      })
    }    
    this.test('carrier')
  }

  setType = async () => {
    if (this.state.filterType !== FILTER_TYPE.TYPE) {
      await this.setState({
        filterType: FILTER_TYPE.TYPE,
        header: SORT_STATE.DEFAULT
      })
    }    
    this.test('type')
  }

  setTimeOfDeparture = async () => {
    if (this.state.filterType !== FILTER_TYPE.TIME_OF_DEPARTURE) {
      await this.setState({
        filterType: FILTER_TYPE.TIME_OF_DEPARTURE,
        header: SORT_STATE.DEFAULT
      })
    }    
    this.test3('date', false)
  }

  setSoldTickets = async () => {
    if (this.state.filterType !== FILTER_TYPE.SOLD_TICKETS) {
      await this.setState({
        filterType: FILTER_TYPE.SOLD_TICKETS,
        header: SORT_STATE.DEFAULT
      })
    }    
    this.test2('soldTickets')
  }

  setDate = async () => {
    if (this.state.filterType !== FILTER_TYPE.DATE) {
      await this.setState({
        filterType: FILTER_TYPE.DATE,
        header: SORT_STATE.DEFAULT
      })
    }    
    this.test3('date', true)
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
      filterType,
      header
    } = this.state
    return (
      <table className="spon-agenda">
        <thead key="thead" className="spon-agenda__thead">
          <tr className="spon-agenda__row  spon-agenda__row--head">
            <th onClick={this.setDate} className={filterType === FILTER_TYPE.DATE ? header : SORT_STATE.DEFAULT}>
              Date
            </th>
            <th onClick={this.setTimeOfDeparture} className={filterType === FILTER_TYPE.TIME_OF_DEPARTURE ? header : SORT_STATE.DEFAULT}>
              Time of departure
            </th>
            <th className="spon-agenda__cell spon-agenda__cell--head">
              Time of Arrival
            </th>
            <th onClick={this.setFrom} className={filterType === FILTER_TYPE.FROM ? header : SORT_STATE.DEFAULT}>From</th>
            <th onClick={this.setTo} className={filterType === FILTER_TYPE.TO ? header : SORT_STATE.DEFAULT}>To</th>
            <th onClick={this.setCarrier} className={filterType === FILTER_TYPE.CARRIER ? header : SORT_STATE.DEFAULT}>Carrier</th>
            <th onClick={this.setType} className={filterType === FILTER_TYPE.TYPE ? header : SORT_STATE.DEFAULT}>Type</th>
            <th className="spon-agenda__cell spon-agenda__cell--head">
              Qty of tickets
            </th>
            <th className="spon-agenda__cell spon-agenda__cell--head">
              Available tickets
            </th>
            <th onClick={this.setSoldTickets} className={filterType === FILTER_TYPE.SOLD_TICKETS ? header : SORT_STATE.DEFAULT}>
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
                  <p>There was a problem when we tried to find courses</p>
  
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
                    <p>No tickets are available this month.</p>
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
