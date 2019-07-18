import React from 'react'
import { debounce } from 'lodash'

import Header from '../../Components/Header'
import Table from '../../Components/Table'

import { ControlledStateOverrideProps, SortingRule } from 'react-table'
import withToast from '../../../Common/HOC/withToast'
import { getToken } from '../../../Common/Utils/helpers'
import { IOrder } from '../../Utils/adminTypes'
import { ERRORS, SUCCESS } from '../../Utils/constants'
import { getOrders, editOrderState } from '../../Utils/api'
import { IState, IProps } from './types'
import { columns } from './columns'

class OrdersContainer extends React.Component<IProps, IState> {
  readonly state: IState = {
    orders: [],
    isLoading: false,
    total: 0,
    currentPage: 0,
    search:'',
    results: [],
  }


  handleFetchItems = (page: number, limit: number, sort?: SortingRule) => {
    const token = getToken()

    getOrders(page, limit, token, sort)
      .then(({ data }) =>{
        this.setState({
          isLoading: false,
          orders: data.results,
          total: data.status.total
        })
      }
    )
    .catch(err => this.props.showError(err, ERRORS.ORDERS_FETCH))
    
    getOrders(page, 1000, token, sort)
    .then(({ data }) =>{
      this.setState({
        isLoading: false,
        results: data.results,
        total: data.status.total
      })
    }
  )
  .catch(err => this.props.showError(err, ERRORS.ORDERS_FETCH))
  }

  handleFetchTableData = ({ page, sorted }: ControlledStateOverrideProps) => {
    this.setState({ currentPage: page! })
    if (sorted) {
      this.handleFetchItems(page!, 10, sorted[0])
    } else {
      this.handleFetchItems(page!, 10)
    }
  }

  handleToggleSwitch = (id: string, value: boolean) => {
    const token = getToken()

    editOrderState(id, value, token)
      .then(({ data }) => {
        const updatedOrders = this.state.orders.map((order: IOrder) => {
          if (order._id === data._id) {
            return data
          }

          return order
        })

        this.setState({ orders: updatedOrders })
        this.props.showSuccess(SUCCESS.ORDER_UPDATE)
      })
      .catch(err => this.props.showError(err, ERRORS.ORDERS_EDIT))
  }

  render() {
    const { isLoading, search, results } = this.state
    let {orders, total} = this.state

    if (search) {
			orders = results.filter(order => {
        return order.buyer.name.toLowerCase().includes(search.toLowerCase()) 
                  || order.buyer.email.toLowerCase().includes(search.toLowerCase())
                  || order._id.toLowerCase().includes(search.toLowerCase())
                  || order.buyer.phone.toLowerCase().includes(search.toLowerCase())
      })
      total = orders.length
    }
    return (
      <>
        <Header title="Transactions" 
         query={search}
         handleSearch={(e) => this.setState({search: e.target.value})}
        />
        <Table
          data={orders}
          handleFetchData={this.handleFetchTableData}
          columns={columns(debounce(this.handleToggleSwitch, 300))}
          loading={isLoading}
          pages={Math.ceil(total / 10)}
          className="spon-table--transactions"
        />
      </>
    )
  }
}

export default withToast(OrdersContainer)
