import React, { Component } from 'react'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'

import DynamicSelectContainer from '../Select/dynamic'
import DynamicDeselectContainer from '../Deselect/dynamic'
import DynamicPaymentContainer from '../Payment/dynamic'
import DynamicSummaryContainer from '../Summary/dynamic'
import EditSelectionContainer from  '../EditSelection/dynamic'

import './styles.scss'

export default class DestinationsContainer extends Component<
  RouteComponentProps<{}>
> {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { match } = this.props

    return (
      <section className="main-cnt">
        <Switch>
          <Route
            exact
            path={`${match.url}/select`}
            component={DynamicSelectContainer}
          />
          <Route
            exact
            path={`${match.url}/deselect`}
            component={DynamicDeselectContainer}
          />
          <Route
            exact
            path={`${match.url}/payment`}
            component={DynamicPaymentContainer}
          />
          <Route
            exact
            path={`${match.url}/summary`}
            component={DynamicSummaryContainer}
          />
             <Route
            exact
            path={`${match.url}/editSelection`}
            component={EditSelectionContainer}
          />
        </Switch>
      </section>
    )
  }
}
