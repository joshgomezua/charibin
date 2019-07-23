import React from 'react'
import * as moment from 'moment'
import { IDuration } from '../../../Common/Utils/globalTypes'
import Checkbox from '../../Components/ClickableCheckbox'
import { RowRenderProps } from 'react-table'
import 'moment-duration-format'

export const columns = (
  selection: any,
  selectAll: number,
  openDeleteModal: (id: string) => void,
  openEditModal: (id: string) => void,
  openTimeSelectionModal: (id: string) => void,
  redirectToCreateTicket: (trip: { _id: string; departure: string; destination: string }) => void,
  toggleAll: () => void,
  toggleSelection: (id: string) => void
) => [
  {
    id: "checkbox",
    accessor: "",
    Cell: (props: RowRenderProps) => {
      console.log(selection)
      return (
        // <Checkbox
        //   id="checkbox"
        //   className="checkbox"
        //   isChecked={selection[props.row._original._id] === true}
        //   handleChange={() => toggleSelection(props.row._original._id)}
        // />
        // <>
        //   <div className="spon-checkbox"> 
        //     <input
        //       id={`isSelected${props.index}`}
        //       type="checkbox"
        //       className="spon-checkbox"
        //       checked={selection[props.row._original._id] === true}
        //       onChange={() => toggleSelection(props.row._original._id)}
        //     />
        //     <div className="spon-checkbox__icon" />
        //   </div>
        // </>

            <input
              id={`isSelected${props.index}`}
              type="checkbox"
              name="checkbox"
              checked={selection[props.row._original._id] === true}
              onChange={() => toggleSelection(props.row._original._id)}
            />

      );
    },
    Header: () => {
      return (
        // <Checkbox
        //   id="checkbox"
        //   className="spon-checkbox"
        //   isChecked={selectAll === 1 ? true : false}
        //   ref={(input: any) => {
        //     if (input) {
        //       input.indeterminate = selectAll === 2;
        //     }
        //   }}
        //   handleChange={() => toggleAll()}
        // />
        // <>
        //   <div className="spon-checkbox"> 
        //     <input
        //       type="checkbox"
        //       className="spon-checkbox"
        //       checked={selectAll === 1}
        //       ref={input => {
        //         if (input) {
        //           input.indeterminate = selectAll === 2;
        //         }
        //       }}
        //       onChange={() => toggleAll()}
        //     />
        //     <div className="spon-checkbox__icon" />
        //   </div>
        // </>
        <input
				  type="checkbox"
					checked={selectAll === 1}
					ref={input => {
						if (input) {
							input.indeterminate = selectAll === 2;
						}
					}}
					onChange={() => toggleAll()}
				/>
      );
    },
    sortable: false,
    width: 65
  },
  {
    Header: 'From',
    accessor: 'departure.name',
  },
  {
    Header: 'To',
    accessor: 'destination.name'
  },
  {
    Header: 'Fake',
    accessor: 'fake',
    width: 80,
    sortable: false,
    Cell: (props: RowRenderProps) => (
      <Checkbox id={`isFake${props.index}`} isChecked={props.value} />
    )
  },
  {
    Header: 'Active',
    accessor: 'active',
    width: 80,
    sortable: false,
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
    accessor: 'deselectionPrice',
    width: 160,
    sortable: false,
    Cell: (props: RowRenderProps) => `£ ${props.value}`
  },
  {
    Header: 'Time Selection',
    accessor: 'timeSelection.defaultPrice',
    width: 150,
    sortable: false,
    Cell: (props: RowRenderProps) => { 
      let multiplePrices: boolean = false;
      for(const key in props.row._original.timeSelection){
        if(props.row._original.timeSelection[key] !== props.value) {
          multiplePrices = true;
        }
      }
      return(
      <> 
        <div className="spon-table__actions">
           {multiplePrices === true ? ( <> £ {props.value} * </> ) : ( <> £ {props.value} </> ) }
          <button onClick={() => openTimeSelectionModal(props.row._original._id)}>
            Advanced
          </button>
        </div>
      </>
    )}

    
  },
  {
    Header: 'Duration',
    accessor: 'duration',
    width: 90,
    Cell: (props: RowRenderProps) => {
      const duration = moment.duration({ minutes: props.value }) as IDuration
      return `${duration.format('h[h]mm[m]')}`
    }
  },
  {
    expander: true,
    width: 80,
    sortable: false,
    Expander: (props: RowRenderProps) => (
      <div className="spon-table__actions">{
        props.isExpanded
          ? <button> Range ⬆︎ </button>
          : <button> Range ⬇︎ </button>
      }</div>
    )
  },
  {
    Header: '',
    accessor: 'isFromAPI',
    width: 210,
    sortable: false,
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
          <button disabled={!props.row._original.destination.isEnabled} onClick={() => openEditModal(props.row._original._id)}>
            Modify
          </button>
          <button onClick={() => openDeleteModal(props.row._original._id)} disabled={props.value}>
            Delete
          </button>
        </div>
      </>
    )
  }
]
