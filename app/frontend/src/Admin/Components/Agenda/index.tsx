import React from 'react'
import moment from 'moment'

import Loading from '../../../Common/Components/Loader'
import AgendaItem from '../AgendaItem'
import Button from '../../../Common/Components/Button'

import { MODAL_TYPE } from '../../Utils/adminTypes'
import { ITicket } from '../../../Common/Utils/globalTypes'
import { IProps, DIRECTION } from './types'
import './styles.scss'
import Pagination from 'src/App/Components/Pagination';

const Agenda: React.SFC<IProps> = ({
  tickets,
  openModal,
  loading,
  error,
  retry,
  filters,
  filterFrom,
  filterTo,
  changeActiveState,
  openEditModal,
  pagination,
  handlePaginationClick
}) => {
  const getFilteredTickets = () => {
    const areFromToFiltersUsed = (
      filterFrom.length && filterFrom ||
       filterTo.length && filterTo
    )
       
    if (areFromToFiltersUsed){
      return getFilteredFromToTickets(
        getFilteredFromToTickets(tickets, filterFrom, DIRECTION.DEPARTURE),
        filterTo,
        DIRECTION.DESTINATION
        )
    }
    return tickets;
  }
  
  const getFilteredFromToTickets = (tickets: ITicket[], filters: string[], direction: string) => {
    if (filters.length) {
      return tickets.filter(
        (ticket: ITicket) =>
          filters.includes(ticket[direction])
      )
    }
    return tickets
  }

  const handlePaginationOnClick = (page: number) => {
    handlePaginationClick(page)
  }

  const prepareRows = () => {
    const filtered = getFilteredTickets()
    const segregated = filtered.reduce((acc, ticket: ITicket) => {
      const day = moment.utc(ticket.date.start).format('D')
      if (day in acc) {
        acc[day].push(ticket)
      } else {
        acc[day] = [ticket]
      }
      return acc
    }, {})
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

  return (
    <table className="spon-agenda">
      <thead key="thead" className="spon-agenda__thead">
        <tr className="spon-agenda__row  spon-agenda__row--head">
          <th className="spon-agenda__cell spon-agenda__cell--head spon-agenda__cell--first-item">
            Date
          </th>
          <th className="spon-agenda__cell spon-agenda__cell--head">
            Time of departure
          </th>
          <th className="spon-agenda__cell spon-agenda__cell--head">
            Time of Arrival
          </th>
          <th className="spon-agenda__cell spon-agenda__cell--head">From</th>
          <th className="spon-agenda__cell spon-agenda__cell--head">To</th>
          <th className="spon-agenda__cell spon-agenda__cell--head">Carrier</th>
          <th className="spon-agenda__cell spon-agenda__cell--head">Type</th>
          <th className="spon-agenda__cell spon-agenda__cell--head">
            Qty of tickets
          </th>
          <th className="spon-agenda__cell spon-agenda__cell--head">
            Available tickets
          </th>
          <th className="spon-agenda__cell spon-agenda__cell--head">
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
                  <p>No courses are available this month.</p>
                </div>
              </td>
            </tr>
          )}
        {!loading && !error && tickets.length > 0 && prepareRows() 
        }
      </tbody>
      <tfoot>
      <tr className="spon-agenda__pagination">
        {console.log('pagination')}
            <td>
              <div >
                <Pagination 
                  pagination={pagination}
                  onChange={handlePaginationOnClick}
                />
              </div>
            </td>
          </tr>
      </tfoot>
    </table>
  )
}

export default Agenda
