import React from 'react'
import * as moment from 'moment'
import { IDuration } from '../../../Common/Utils/globalTypes'
import Checkbox from '../../Components/Checkbox'
import { RowRenderProps } from 'react-table'
import 'moment-duration-format'

export const rangeColumns = (
  openDeleteModal: (id: string) => void,
  openEditModal: (id: string) => void,
  openTimeSelectionModal: (id: string) => void,
  redirectToCreateTicket: (trip: { _id: string; departure: string; destination: string }) => void
) => [
  {
    width: 5,
  },
  {
    accessor: 'date.start',
    width: 142,
    Cell: (props: RowRenderProps) => moment(props.value).format('MMM DD, YYYY')
  },
  {
    accessor: 'date.end',
    width: 142,
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
    Header: 'Prices',
    accessor: 'adultPrice',
    width: 100,
    Cell: (props: RowRenderProps) => (<div>
      A: $ {props.value}<br/>C: $ {props.row._original.childPrice}
    </div>
    )
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
    Cell: (props: RowRenderProps) => { 
      let multiplePrices: boolean = false;
      for(const key in props.row._original.timeSelection){
        if(props.row._original.timeSelection[key] != props.value)
          multiplePrices = true;
      }
      return(
      <> 
        <div className="spon-table__actions">
           {multiplePrices == true ? ( <> £ {props.value} * </> ) : ( <> £ {props.value} </> ) }
          <button onClick={() => openTimeSelectionModal(props.row._original._id)}>
            Advanced
          </button>
        </div>
      </>
    )}
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
    width: 80,
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
                departure: props.row.departure.name,
                destination: props.row.destination.name,
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
    Footer: (props: RowRenderProps ) => { }
  }
]
