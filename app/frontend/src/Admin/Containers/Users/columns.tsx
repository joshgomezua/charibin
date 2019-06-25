import React from 'react'
//import * as moment from 'moment'
//i//mport { IDuration } from '../../../Common/Utils/globalTypes'
//import Checkbox from '../../Components/Checkbox'
import { RowRenderProps } from 'react-table'
import 'moment-duration-format'
import Switch from 'src/Admin/Components/Switch';
import Button from 'src/Common/Components/Button';

export const columns = (
  openDeleteModal: (id: string) => void,
  openEditModal: (id: string) => void,
  openResetPasswordModal: (id: string) => void,
  onSwitchChange: ((id: string, value: boolean) => void),
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
    width: 90,
    accessor: 'active',
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
    accessor: 'reset',
    Cell: (props: RowRenderProps) => (<Button
              className="spon-agenda__add-button"
              variant="blue"
              //icon="plus"
              text="Reset password"
             
                onClick={() => openResetPasswordModal(props.row._original._id)
              }
            />
    )
  },


  {
    Header: '',
    accessor: 'actions',
    width: 400,
    Cell: (props: RowRenderProps) => (
      <>


        <div className="spon-table__actions">


        {/** indentation */}
          
         
          
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
