import React from 'react'
import { RowRenderProps } from 'react-table'
import Switch from '../../Components/Switch'
import Button from 'src/Common/Components/Button';
import './style.scss'


let count: number = 0
export const columns = (
  openDeleteModal: (id: string) => void,
  openEditModal: (id: string) => void,
  onSwitchChange: ((id: string, value: boolean) => void),
  //redirectToCreateCity: (city: { _id: string; name: string }) => void
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
    Cell: (props: RowRenderProps) => (
      props.value.map((tag: string) => {
          const length: number = props.value.length
          if ( count < length) {
              count++
              console.log('je suis dans le if')
              return(<>{tag + "; "}</>)
          } else {
            return(<>{tag}</>)
          }
      })
    )
  
  },
  {
    Header: 'Photo',
    accessor: 'photo',
    Cell: (props: RowRenderProps) => (
      <div className="spon-table__photo">        
        <img src={props.value} alt="Avatar photo"/>
      </div>
    )
  },
  {
    Header: 'Modify',
    accessor: 'isModify',
    Cell: (props: RowRenderProps) => (
 
        <Button
          text = "modify"
          variant = "adminPrimary"
          icon = "pencil"
          //disabled = {!(props.value)}
          onClick={() => openEditModal(props.row._original._id)}
        />
     
      )
  },

  {
    Header: 'Enable',
    accessor: 'isModify',
    Cell: (props: RowRenderProps) => (
      <Switch
      onChange={() => {
        onSwitchChange(props.row._original._id, !props.value)
      }}
      checked={props.value}
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
