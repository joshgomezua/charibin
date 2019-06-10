import React from 'react'
import { RowRenderProps } from 'react-table'
import Switch from 'src/Admin/Components/Switch';
import Button from 'src/Common/Components/Button';


export const columns = (
  openDeleteModal: (id: string) => void,
  openEditModal: (id: string) => void,
) => [
  {
    Header: 'City',
    accessor: 'name'
  },
  {
    Header: 'Country',
    accessor: 'country',
   
  },
  {
    Header: 'Key words',
    accessor: 'tags',
  },
  {
    Header: 'Photo',
    accessor: 'photo',
    Cell: (props: RowRenderProps) => (
      <div className="spon-table__photo">  
        {console.log(props.value)}      
        <img src={props.value} alt="Avatar photo"/>
      </div>
    )
  },
  {
    Header: 'Modify',
    accessor: 'modify',
    Cell: (props: RowRenderProps) => (
        <Button
          text = "modify"
          variant = "adminPrimary"
          icon = "pencil"
          onClick={() => openEditModal(props.row._original._id)}
        />
      )
  },

  {
    Header: 'Enable',
    accessor: 'enable',
    Cell:  (
        <Switch
          checked = {true}
          onChange = {() => {console.log("allo")}}
        />)
  },

  {
    Header: 'Delete',
    accessor: 'delete',
    Cell: (props: RowRenderProps) => (
      <Button
        text = "delete"
        icon = "trash"
        variant = "adminPrimary"
        onClick={() => openDeleteModal(props.row._original._id)}
      />
    )
  },
]
