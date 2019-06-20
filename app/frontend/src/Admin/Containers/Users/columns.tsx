import React from 'react'
//import * as moment from 'moment'
//i//mport { IDuration } from '../../../Common/Utils/globalTypes'
//import Checkbox from '../../Components/Checkbox'
import { RowRenderProps } from 'react-table'
import 'moment-duration-format'
import Switch from 'src/Admin/Components/Switch';

export const columns = (
  openDeleteModal: (id: string) => void,
  openEditModal: (id: string) => void,
  
  onSwitchChange: ((id: string, value: boolean) =>void),
) => [
  {
    Header: 'User',
    accessor: 'name'
  },
  {
    Header: 'Email',
    accessor: 'email',
    width: 80,
    
  },
  {
    Header: 'Role',
    accessor: 'role',
   
  },
  {
    Header: 'Active',
    accessor: 'active',
    width: 80,
    Cell: (props: RowRenderProps) => (
      <Switch 
      onChange={() => {
         onSwitchChange(props.row._original._id, !props.value)
      }}
      checked={props.value}
      />
    )
  },
  
  
  {
    Header: '',
    accessor: 'actions',
    width: 200,
    Cell: (props: RowRenderProps) => (
      <>
        <div className="spon-table__actions">
          
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
