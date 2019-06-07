import React from 'react'
import * as moment from 'moment'
import { IDuration } from '../../../Common/Utils/globalTypes'
import Checkbox from '../../Components/Checkbox'
import { RowRenderProps } from 'react-table'
import 'moment-duration-format'

export const columns = (
  openDeleteModal: (id: string) => void,
  openEditModal: (id: string) => void,
  openTimeSelectionModal: (id: string) => void,
  redirectToCreateTicket: (trip: { _id: string; departure: string; destination: string }) => void
) => [
  {
    Header: 'From',
    accessor: 'departure'
  },
  {
    Header: 'To',
    accessor: 'destination'
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
    Header: 'Carrier',
    accessor: 'carrier',
    width: 120,
  },
  {
    Header: 'Type',
    accessor: 'type',
    width: 90,
  },
  {
    Header: 'Price',
    accessor: 'price',
    width: 100,
    Cell: (props: RowRenderProps) => `£ ${props.value}`
  },
  {
    Header: 'Offer',
    accessor: 'discount',
    width: 80,
    Cell: (props: RowRenderProps) => `-${props.value}%`
  },
  {
    Header: 'Deselection Price',
    accessor: 'schedule.defaultPrice',
    Cell: (props: RowRenderProps) => `£ ${props.value}`
  },
  {
    Header: 'Time Selection',
    accessor: 'timeSelection',
    width: 150,
    Cell: (props: RowRenderProps) => (
      <> 
        <div className="spon-table__actions">
          £ {props.value} 
          <button onClick={() => openTimeSelectionModal(props.row._original._id)}>
            Advanced
          </button>
        </div>
      </>
    )
    
  },
  // {
  //   Header: 'Photo',
  //   accessor: 'photo',
  //   width: 80,
  //   Cell: (props: RowRenderProps) => (
  //     <div className="spon-table__photo">
  //       <img src={props.value} alt="Avatar photo" />
  //     </div>
  //   )
  // },
  {
    Header: 'Duration',
    accessor: 'duration',
    width: 90,
    Cell: (props: RowRenderProps) => {
      const duration = moment.duration({ minutes: props.value }) as IDuration
      return `${duration.format('h[h]mm')}`
    }
  },
  {
    Header: '',
    accessor: 'actions',
    width: 210,
    Cell: (props: RowRenderProps) => (
      <>
        <div className="spon-table__actions">
          <button
            onClick={() =>
              redirectToCreateTicket({
                _id: props.row._original._id,
                departure: props.row.departure,
                destination: props.row.destination,
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
