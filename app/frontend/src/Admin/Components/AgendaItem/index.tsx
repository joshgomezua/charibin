import React from 'react'
import moment from 'moment'
import classnames from 'classnames'

import Button from '../../../Common/Components/Button'
import Switch from '../../Components/Switch'

import { MODAL_TYPE } from '../../Utils/adminTypes'
import { IProps } from './types'

const AgendaItem: React.SFC<IProps> = ({
  ticket,
  index,
  rowSpan,
  openTicket,
  openModal,
  changeActiveState
}) => {
  const isTodayClassname = classnames(
    'spon-agenda__cell spon-agenda__cell--body spon-agenda__cell--date spon-agenda__cell--first-item',
    {
      'is-today': moment().isSame(ticket.date.start)
    }
  )
  return (
    <tr className="spon-agenda__row">
      {index === 0 ? (
        <td className={isTodayClassname} rowSpan={rowSpan}>
          <p>{moment.utc(ticket.date.start).format('ddd')}</p>
          <p>{moment.utc(ticket.date.start).format('D MMM YYYY')}</p>
        </td>
      ) : (
        <td className="spon-agenda__cell spon-agenda__cell--body  spon-agenda__cell--first-item" />
      )}
      <td className="spon-agenda__cell spon-agenda__cell--body">
        {moment.utc(ticket.date.start).format('HH:mm')}-
        {moment.utc(ticket.date.end).format('HH:mm')}
      </td>
      <td className="spon-agenda__cell spon-agenda__cell--body">
        {moment.utc(ticket.date.start).add(ticket.trip.duration, 'minutes').format('HH:mm')}-
        {moment.utc(ticket.date.end).add(ticket.trip.duration, 'minutes').format('HH:mm')}
      </td>
      <td className="spon-agenda__cell spon-agenda__cell--body">
        {ticket.departure}
      </td>
      <td className="spon-agenda__cell spon-agenda__cell--body">
        {ticket.destination}
      </td>
      <td className="spon-agenda__cell spon-agenda__cell--body">
        {ticket.carrier}
      </td>
      <td className="spon-agenda__cell spon-agenda__cell--body">
        {ticket.type}
      </td>
      <td className="spon-agenda__cell spon-agenda__cell--body">
        {`A: $`+ticket.adultPrice}<br/>
        {`C: $`+ticket.childPrice}
      </td>
      <td className="spon-agenda__cell spon-agenda__cell--body">
        {ticket.quantity}
      </td>
      <td className="spon-agenda__cell spon-agenda__cell--body">
        {ticket.quantity - ticket.soldTickets < 0 ? 0 : ticket.quantity - ticket.soldTickets}
      </td>
      <td className="spon-agenda__cell spon-agenda__cell--body">
        {ticket.soldTickets}
      </td>
      
      <td className="spon-agenda__cell spon-agenda__cell--body">
        <Switch
          checked={ticket.active}
          onChange={() => {
            changeActiveState(ticket._id, !ticket.active)
          }}
        />
      </td>

      <td className="spon-agenda__cell spon-agenda__cell--body spon-agenda__cell--edit">
        <Button
          onClick={() => openTicket(ticket._id)}
          text="Edit"
          variant="adminSecondary"
          className="spon-agenda__button"
        />

        <div
          className="spon-agenda__delete-btn"
          onClick={() =>
            openModal(MODAL_TYPE.DELETE_TICKET, 'Delete ticket', ticket._id)
          }>
          <span />
          <span />
        </div>
      </td>
    </tr>
  )
}

export default AgendaItem
