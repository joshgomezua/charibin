import React from 'react'
import { RowRenderProps } from 'react-table'

export const columns = (
  openDeleteModal: (id: string) => void,
  openEditModal: (id: string) => void,
  redirectToCreateTicket: (trip: { _id: string; name: string }) => void
) => [
  {
    Header: 'City',
    accessor: 'name'
  },
  {
    Header: 'Country',
    accessor: 'country',
    Cell: (props: RowRenderProps) => `£ ${props.value}`
  },
  {
    Header: 'Key words',
    accessor: 'tags',
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
