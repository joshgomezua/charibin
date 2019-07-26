import React from 'react'
import ReactTable, { RowInfo } from 'react-table'
import classnames from 'classnames'
// import PropTypes from 'prop-types'
import { IProps, IState } from './types'
import './styles.scss'
import './table.scss'
import TripTable from '../TripTable';
import selectTableHOC from "react-table/lib/hoc/selectTable";

const SelectTable = selectTableHOC(ReactTable)

class ExpandableTable extends React.Component<IProps, IState> {

  readonly state: IState = {
    selectAll: false
  }
  
  // static defaultProps = {
  //   keyField: '_id'
  // };

  // static propTypes = {
  //   keyField: PropTypes.string
  // };

  // toggleSelection = (key: any, changeSelection: (selection: string[]) => void) => {
  //   let selection = [...this.props.selection];
  //   const keyIndex = selection.indexOf(key);
  //   console.log(selection)
  //   console.log(keyIndex)

  //   // check to see if the key exists
  //   if (keyIndex >= 0) {
  //     // it does exist so we will remove it using destructing
  //     selection = [
  //       ...selection.slice(0, keyIndex),
  //       ...selection.slice(keyIndex + 1)
  //     ];
  //   } else {
  //     // it does not exist so add it
  //     selection.push(key);
  //   }
  //   // update the state
  //   console.log(selection)
  //   changeSelection(selection)
  // }

  // isSelected = (key: any) => {
  //   return this.props.selection.includes(`select-${key}`);
  // };

  // toggleAll = (changeSelection: (selection: string[]) => void) => {
  //   const selectAll = !this.state.selectAll;
  //   const selection: string[] = [];

  //   if (selectAll) {
  //     // we need to get at the internals of ReactTable
  //     const wrappedInstance = this.checkboxTable.getWrappedInstance();
  //     // the 'sortedData' property contains the currently accessible records based on the filter and sort
  //     const currentRecords = wrappedInstance.getResolvedState().sortedData;
  //     // we just push all the IDs onto the selection array
  //     currentRecords.forEach((item: any) => {
  //       selection.push(`select-${item._original[keyField]}`);
  //     });
  //   }
  //   this.setState({ selectAll });
  //   changeSelection(selection)
  // };

  // handleSelectionChange = (key: any) => {
  //   this.toggleSelection(key, this.props.changeTripSelection)
  // }

  // handleSelectAll = () => {
  //   this.toggleAll(this.props.changeTripSelection)
  // }

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
        <SelectTable
          manual
          selectType="checkbox"
          // isSelected={this.isSelected}
          // selectAll={this.state.selectAll}
          // toggleSelection={this.handleSelectionChange}
          // toggleAll={this.handleSelectAll}
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
