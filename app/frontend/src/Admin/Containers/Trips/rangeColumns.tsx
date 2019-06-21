import React from 'react'
import * as moment from 'moment'
import { IDuration } from '../../../Common/Utils/globalTypes'
import Checkbox from '../../Components/Checkbox'
import { RowRenderProps } from 'react-table'
import 'moment-duration-format'
// import Button from 'src/Common/Components/Button' 
import { MODAL_TYPE } from 'src/Admin/Utils/adminTypes';

export const rangeColumns = (
  openDeleteModal: (id: string) => void,
  openEditModal: (id: string) => void,
  openTimeSelectionModal: (id: string) => void,
  openScheduleModal: (type: MODAL_TYPE, heading: string) => void,
  redirectToCreateTicket: (trip: { _id: string; departure: string; destination: string }) => void
) => [
  {
    width: 124,
  },
  {
    accessor: 'date.start',
    width: 120,
    Cell: (props: RowRenderProps) => moment(props.value).format('MMM DD, YYYY')
  },
  {
    accessor: 'date.end',
    width: 120,
    Cell: (props: RowRenderProps) => moment(props.value).format('MMM DD, YYYY')
  },
  
  {
    accessor: 'active',
    width: 80,
    Cell: (props: RowRenderProps) => (
      <Checkbox id={`isActive${props.index}`} isChecked={props.value} />
    )
  },
  {
    width: 210,
  },
  {
    accessor: 'price',
    width: 100,
    Cell: (props: RowRenderProps) => `£ ${props.value}`
  },
  {
    accessor: 'discount',
    width: 80,
    Cell: (props: RowRenderProps) => `-${props.value}%`
  },
  {
    accessor: 'deselectionPrice',
    width: 160,
    Cell: (props: RowRenderProps) => `£ ${props.value}`
  },
  {
    accessor: 'timeSelection.defaultPrice',
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

  {
    accessor: 'duration',
    width: 90,
    Cell: (props: RowRenderProps) => {
      const duration = moment.duration({ minutes: props.value }) as IDuration
      return `${duration.format('h[h]mm[m]')}`
    }
  },
  {
    accessor: '_id',
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
    ),
    Footer: (props: RowRenderProps ) => 
      { console.log(props.value) }
    //   //<Button
    // //   className="spon-table-footer__add-button"
    // //   variant="blue"
    // //   icon="plus"
    // //   text="ADD NEW"
    // //   onClick={() => openScheduleModal(MODAL_TYPE.ADD_TRIP, 'Create schedule')}
    // // />)
  }
]
