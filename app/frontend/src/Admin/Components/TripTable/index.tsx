import React from 'react'
import ReactTable, { RowRenderProps } from 'react-table'
import classnames from 'classnames'
import { IProps } from './types'
import './styles.scss'
import './table.scss'
import Footer from 'src/Admin/Components/Footer';
// import Button from 'src/Common/Components/Button' 

const TripTable: React.SFC<IProps> = ({
  columns,
  data,
  handleFetchData,
  loading,
  pages,
  className
}) => {
  const tableClass = classnames('spon-triptable', {
    [`${className}`]: className
  })
  const nullComponent = (props: RowRenderProps) => (null);

  return (
    <div className={tableClass}>
      <ReactTable
        manual
        minRows={1}
        sortable={true}
        resizable={false}
        showPageJump={false}
        defaultPageSize={3}
        TheadComponent={nullComponent}
        TfootComponent={() =>(<Footer />)}
        PaginationComponent={nullComponent}
        columns={columns}
        data={data}
        loading={loading}
        pages={pages}
        onFetchData={handleFetchData}
      />
    </div>
  )
}

export default TripTable
