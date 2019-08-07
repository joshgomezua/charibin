import React from 'react'
import ReactTable, { RowInfo } from 'react-table'
import classnames from 'classnames'
import { IProps, IState } from './types'
import './styles.scss'
import './table.scss'
import TripTable from '../TripTable';

class ExpandableTable extends React.Component<IProps, IState> {

  render(){

    const {
        columns,
        data,
        detailsColumns,
        handleFetchData,
        handleOpenModal,
        loading,
        pages,
        className,
        subComponentClassName
    } = this.props
    
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
          SubComponent={(row: RowInfo) => { 
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
    )}
}

export default ExpandableTable
