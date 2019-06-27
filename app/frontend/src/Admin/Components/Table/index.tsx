import React from 'react'
import ReactTable from 'react-table'
import classnames from 'classnames'
import { IProps } from './types'
import './styles.scss'
import './table.scss'
import TripTable from '../TripTable';

const Table: React.SFC<IProps> = ({
  columns,
  data,
  detailsColumns,
  handleFetchData,
  handleOpenModal,
  loading,
  pages,
  className,
  subComponentClassName
}) => {
  const tableClass = classnames('spon-table', {
    [`${className}`]: className
  })

  return (
    <div className={tableClass}>
      <ReactTable
        manual
        minRows={1}
        sortable={true}
        resizable={false}
        showPageJump={false}
        defaultPageSize={10}
        columns={columns}
        data={data}
        loading={loading}
        pages={pages}
        onFetchData={handleFetchData}
        SubComponent={(row) => { 
          return(
          <div className={subComponentClassName}>
            <TripTable
              data={row.original.scheduledTrips}
              parentTrip={row.original._id}
              columns={detailsColumns}
              handleOpenModal={handleOpenModal}
            />
          </div> 
        )}
      }
      />
    </div>
  )
}

export default Table
