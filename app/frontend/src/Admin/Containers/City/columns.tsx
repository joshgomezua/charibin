import React from 'react'
import { RowRenderProps } from 'react-table'
import Switch from '../../Components/Switch'


let count: number = 0;
const photoPrefix = 'data:image/png;base64,'
export const columns = (
  openDeleteModal: (id: string) => void,
  openEditModal: (id: string) => void,
  onSwitchChange: ((id: string, value: boolean) => void),
) => [
  {
    Header: 'City',
    accessor: 'name',
   
  },
  {
    Header: 'Country',
    accessor: 'country',
    
   
  },
  {
    Header: 'Keywords',
    style: { 'white-space': 'unset' },
    accessor: 'tags',
    sortable: false,
    Cell: (props: RowRenderProps) => (
      props.value.map((tag: string) => {
        const length: number = props.value.length
        if (count < (length - 1) ) {
          count ++
    
          return (<React.Fragment key={tag}>{tag.concat("; ")}</React.Fragment>)
        }else {
          count = 0
    
          return (<React.Fragment key={tag}>{tag.concat(" ")}</React.Fragment>)
          } 
        }
      )
    )    
  },
  {
    Header: 'Photo',
    accessor: 'photo',
    sortable: false,
    Cell: (props: RowRenderProps) => (
      <div className="spon-table__photo">        
        <img src={photoPrefix+props.value} alt="Avatar photo" title={props.row.name}/>
      </div>
    )
  },
  {
    Header: 'Enable',
    width: 90,
    accessor: 'isEnabled',
    sortable: false,
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
    Header: 'Modify',
    width: 90,
    accessor: 'isManual',
    sortable: false,
    Cell: (props: RowRenderProps) => (
      <div  className="spon-table__actions">
        <button disabled={!props.value} onClick={() => openEditModal(props.row._original._id)}>
              Modify
        </button>
      </div>
    )
  },
  {
    Header: 'Delete',
    accessor: 'isManual',
    sortable: false,
    width: 90,
    Cell: (props: RowRenderProps) => (
      <div  className="spon-table__actions"> 
        <button disabled={!props.value} onClick={() => openDeleteModal(props.row._original._id)}>
              Delete
        </button>
      </div>
    )
  },
]