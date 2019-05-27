import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import Preloader from '../../Components/Preloader'
import Summary from '../../Components/Summary'
import Footer from '../../Components/Footer'

import {
  selectFinalSelected,
  selectFinalSelection,
  selectQuantity,
  deselectionPrice,
  setInitialState
} from '../../../Common/Redux/Services/trips'
import { getOwnerToken, removeFromLS } from '../../../Common/Utils/helpers'
import { IStore } from '../../../Common/Redux/types'
import { IState, IProps } from './types'
import './styles.scss'

class SummaryContainer extends Component<
  RouteComponentProps<{}> & IProps,
  IState
> {
  readonly state: IState = {
    completed: false
  }

  componentDidMount() {
    const owner = getOwnerToken()
    if (owner) {
      setTimeout(
        () => this.setState({ completed: true }, () => window.scrollTo(0, 0)),
        5000
      )
      window.scrollTo(0, 0)
    } else {
      this.props.history.push('/')
    }

    window.onbeforeunload = () => {
      this.clearStorage()
    }
  }

  componentWillUnmount() {
    this.clearStorage()
  }

  clearStorage = () => {
    removeFromLS('owner')
    this.props.setInitialState()
  }

  render() {
    const { completed } = this.state
    const { selected, finalSeletion, quantity, deselectionPrice } = this.props

    return (
      <section>
        <CSSTransition
          in={completed}
          classNames="tripctn-animation"
          timeout={500}>
          {completed ? (
            <Summary
              selected={finalSeletion}
              quantity={quantity}
              deselectionPrice={deselectionPrice}
            />
          ) : (
            <Preloader selected={selected} />
          )}
        </CSSTransition>
        <Footer />
      </section>
    )
  }
}

const mapStateToProps = (state: IStore) => ({
  selected: selectFinalSelected(state),
  finalSeletion: selectFinalSelection(state),
  quantity: selectQuantity(state),
  deselectionPrice: deselectionPrice(state)
})

export default connect(
  mapStateToProps,
  { setInitialState }
)(SummaryContainer)
