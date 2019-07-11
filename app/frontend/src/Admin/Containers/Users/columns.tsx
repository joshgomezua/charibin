import React from 'react'
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
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Email',
    accessor: 'email',
      
  },
  {
    Header: 'Role',
    accessor: 'role',
   
  },
  {
    Header: 'Active',
    accessor: 'active',
    width: 300,
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
    Header: 'Reset Password',
    accessor: 'action',
    width: 180,
    Cell: (props: RowRenderProps) => (
            <Button
              className="spon-table__reset-button"
              variant="blue"
              text="RESET Password"
                          
                onClick={() => openResetPasswordModal(props.row._original._id)
              }
            />

    )
  },


  {
    Header: 'Modify',
    width: 180,
    accessor: 'action',
    Cell: (props: RowRenderProps) => (
      <div  className="spon-table__actions">
        <button  onClick={() => openEditModal(props.row._original._id)}>
              Modify
        </button>
      </div>
    )
  },
  {
    Header: 'Delete',
    accessor: 'action',
    width: 180,
    Cell: (props: RowRenderProps) => (
      <div  className="spon-table__actions">
        <button onClick={() => openDeleteModal(props.row._original._id)}>
              Delete
        </button>
      </div>
    )
  },
]