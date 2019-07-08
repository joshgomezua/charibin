import React from 'react'
import ReactTable from 'react-table'
import classnames from 'classnames'
import { IProps } from './types'
import './styles.scss'
import './table.scss'


const Table: React.SFC<IProps> = ({
  columns,
  data,
  handleFetchData,
  loading,
  pages,
  className,
}) => {
  const tableClass = classnames('spon-table', {
    [`${className}`]: className
  })

  return (
    <div className={tableClass}>
      <ReactTable
        className={tableClass}
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
      />
    </div>
  )
}

export default Table
