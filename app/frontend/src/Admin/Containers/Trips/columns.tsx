import React from 'react'
import * as moment from 'moment'
import { IDuration } from '../../../Common/Utils/globalTypes'
import Checkbox from '../../Components/Checkbox'
import { RowRenderProps } from 'react-table'
import 'moment-duration-format'

export const columns = (
  openDeleteModal: (id: string) => void,
  openEditModal: (id: string) => void,
  redirectToCreateTicket: (trip: { _id: string; name: string }) => void
) => [
  {
    Header: 'Trip',
    accessor: 'name'
  },
  {
    Header: 'Fake',
    accessor: 'fake',
    width: 80,
    Cell: (props: RowRenderProps) => (
      <Checkbox id={`isFake${props.index}`} isChecked={props.value} />
    )
  },
  {
    Header: 'Active',
    accessor: 'active',
    width: 80,
    Cell: (props: RowRenderProps) => (
      <Checkbox id={`isActive${props.index}`} isChecked={props.value} />
    )
  },
  {
    Header: 'Price',
    accessor: 'price',
    Cell: (props: RowRenderProps) => `£ ${props.value}`
  },
  {
    Header: 'Offer',
    accessor: 'discount',
    Cell: (props: RowRenderProps) => `-${props.value}%`
  },
  {
    Header: 'Deselection Price',
    accessor: 'deselectionPrice',
    Cell: (props: RowRenderProps) => `£ ${props.value}`
  },
  {
    Header: 'Photo',
    accessor: 'photo',
    Cell: (props: RowRenderProps) => (
      <div className="spon-table__photo">
        <img src={props.value} alt="Avatar photo" />
      </div>
    )
  },
  {
    Header: 'Duration',
    accessor: 'duration',
    Cell: (props: RowRenderProps) => {
      const duration = moment.duration({ minutes: props.value }) as IDuration
      return `${duration.format('h[h]mm')}`
    }
  },
  {
    Header: '',
    accessor: 'actions',
    width: 200,
    Cell: (props: RowRenderProps) => (
      <>
        <div className="spon-table__actions">
          <button
            onClick={() =>
              redirectToCreateTicket({
                _id: props.row._original._id,
                name: props.row.name
              })
            }>
            Schedule
          </button>
          <button onClick={() => openEditModal(props.row._original._id)}>
            Modify
          </button>
          <button onClick={() => openDeleteModal(props.row._original._id)}>
            Delete
          </button>
        </div>
      </>
    )
  }
]
