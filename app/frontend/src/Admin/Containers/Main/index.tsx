import React, { Component } from 'react'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'

import ORDERS from '../Orders'
import Tickets from '../Tickets'
import Trips from '../Trips'
import City from '../City'
import Users from '../Users'
import Account from '../Account'
import { ADMIN_ROUTING } from '../../Utils/constants'
import { IState } from './types'
import 'react-toastify/dist/ReactToastify.css'

export default class MainContainer extends Component<
  RouteComponentProps<{}>,
  IState
> {
  render() {
    const { match } = this.props

    return (
      <section className="admin-cnt">
        <Switch>
          <Route
            exact
            path={`${match.url}${ADMIN_ROUTING.TICKETS}`}
            component={Tickets}
          />
          <Route
            exact
            path={`${match.url}${ADMIN_ROUTING.TRIPS}`}
            component={Trips}
          />
          <Route
            exact
            path={`${match.url}${ADMIN_ROUTING.ORDERS}`}
            component={ORDERS}
          />
          <Route 
            exact
            path={`${match.url}${ADMIN_ROUTING.CITIES}`} 
            component={City}
          />
      
          <Route
            exact
            path={`${match.url}${ADMIN_ROUTING.USERS}`}
            component={Users}
          />
          <Route
            exact
            path={`${match.url}${ADMIN_ROUTING.ACCOUNT}`}
            component={Account}
          />
        </Switch>
      </section>
    )
  }
}
