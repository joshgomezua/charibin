import React from 'react'
import moment from 'moment'
import Switch from '../../Components/Switch'
import { RowRenderProps } from 'react-table'

export const columns = (
  onSwitchChange: ((id: string, value: boolean) => void),
) => [
  {
    Header: 'ID',
    accessor: '_id',
    width: 70,
    Cell: (props: RowRenderProps) => `...${props.value.slice(-6)}`
  },
  {
    Header: 'Bought date',
    accessor: 'createdAt',
    width: 150,
    Cell: (props: RowRenderProps) => (
      <div>
        <div>{moment(props.value).format('DD.MM.YY')}</div>
        <div>- {moment(props.value).format('HH:mm')}</div>
      </div>
    )
  },
  {
    Header: 'Name',
    accessor: 'buyer.name'
  },
  {
    Header: 'Phone',
    accessor: 'buyer.phone'
  },
  {
    Header: 'Date of birth',
    accessor: 'buyer.birthDate',
    width: 120,
    Cell: (props: RowRenderProps) => moment(props.value).format('DD.MM.YY')
  },
  {
    Header: 'Email',
    accessor: 'buyer.email',
    minWidth: 120
  },
  {
    Header: 'Selected',
    accessor: 'selected',
    minWidth: 150
  },
  {
    Header: 'Deselected',
    accessor: 'deselected',
    minWidth: 100
  },
  {
    Header: 'Final selection',
    accessor: 'finalSelection',
    minWidth: 120
  },
  {
    Header: 'Final destination',
    accessor: 'finalDestination',
    minWidth: 140
  },
  {
    Header: 'Arrival Time',
    accessor: 'date.arrival',
    width: 160,
    Cell: (props: RowRenderProps) =>
      `${moment.utc(props.value.start).format('DD.MM.YY HH:mm')} - ${moment
        .utc(props.value.end)
        .format('DD.MM.YY HH:mm')} ${
        props.original.isTimeSelected ? '($)' : ''
      }`
  },
  {
    Header: 'Departure Time',
    accessor: 'date.departure',
    width: 145,
    Cell: (props: RowRenderProps) =>
      `${moment.utc(props.value.start).format('DD.MM.YY HH:mm')} - ${moment
        .utc(props.value.end)
        .format('DD.MM.YY HH:mm')} ${
        props.original.isTimeSelected ? '($)' : ''
      }`
  },
  {
    Header: 'Price',
    accessor: 'totalPrice',
    width: 70,
    Cell: (props: RowRenderProps) => `£ ${props.value}`
  },
  {
    Header: 'Qty',
    accessor: 'quantity',
    width: 70
  },
  {
    Header: 'Sent',
    accessor: 'sent',
    sortable: false,
    width: 70,
    Cell: (props: RowRenderProps) => (
      props.row.user.role === "Read Only || Client" ?
      <Switch
        onChange={() => { /* */}}
        checked={false}
      /> :

      <Switch
        onChange={() => {
          onSwitchChange(props.row._id, !props.value)
        }}
        checked={props.value}
      />
    ) 
  },
  {
    Header:'User',
    accessor: 'user',
    Cell: (props: RowRenderProps) => (
        props.row.sent ? props.value.name : "" )
  }
]
