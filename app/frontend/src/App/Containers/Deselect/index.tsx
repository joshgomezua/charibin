import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import MainBlock from '../../Components/MainBlock'
import Steps from '../../Components/Steps'
import Destination from '../../Components/Destination'
import SelectPanel from '../../Components/SelectPanel'
import Button from '../../../Common/Components/Button'

import withToast from '../../../Common/HOC/withToast'
import withCountdown from '../../../App/HOC/withCountdown'
import { compose } from '../../../Common/HOC/compose'
import { IStore } from '../../../Common/Redux/types'
import {
  selectSelected,
  selectIsMaxDeselected,
  selectDeselected,
  clearDeselected,
  addDeselected
} from '../../../Common/Redux/Services/trips'

import {
  getFromLS,
  saveToLS,
  getOwnerToken
} from '../../../Common/Utils/helpers'
import { unbookTrips } from '../../Utils/api'
import { ISelectedData } from '../../Utils/appTypes'
import { STEP_IDS } from '../../Utils/constants'
import { RouteComponentProps } from 'react-router-dom'
import { IProps, IState } from './types'
import './styles.scss'

const MAX = 3

class DeselectContainer extends Component<
  RouteComponentProps<{}> & IProps,
  IState
> {
  private interval: any
  readonly state: IState = {
    remainingTime: ''
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const owner = getFromLS('owner')

    if (!owner || !owner.token) {
      this.props.history.push('/')
    }

    const creatdeDate = moment.utc(owner.createdAt).format()
    this.interval = setInterval(() => {
      this.props.countdown(
        creatdeDate,
        this.props.showSuccess,
        this.props.history.push,
        this.setRemainingTime,
        this.interval
      )
    }, 1000)
  }

  setRemainingTime = (time: string) => {
    this.setState({ remainingTime: time })
  }

  onDeselect = (deselectedItem: ISelectedData) => {
    const owner = getFromLS('owner')
    const { isMax, addDeselected } = this.props
    if (isMax) {
      return
    }

    if (owner) {
      const newLSData = {
        ...owner,
        token: owner.token,
        data: {
          ...owner.data,
          deselected: !owner.data.deselected
            ? [deselectedItem]
            : [...owner.data.deselected, deselectedItem]
        }
      }

      saveToLS('owner', newLSData)
    }
    addDeselected(deselectedItem)
  }

  onClear = () => {
    const owner = getFromLS('owner')

    if (owner) {
      const newLSData = {
        ...owner,
        token: owner.token,
        data: {
          ...owner.data,
          deselected: []
        }
      }

      saveToLS('owner', newLSData)
    }
    this.props.clearDeselected()
  }

  onNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const token = getOwnerToken()
    const deselectedTripsId = this.props.deselected.map(
      (deselected: ISelectedData) => deselected.tripId
    )

    if (deselectedTripsId.length) {
      const apiData = {
        owner: token,
        trips: deselectedTripsId
      }
      unbookTrips(apiData)
        .then(() => {
          this.props.history.push('/destinations/payment')
        })
        .catch(err => {
          this.props.showError(err)
        })
    } else {
      this.props.history.push('/destinations/payment')
    }
  }

  onBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.props.history.push('/destinations/select')
  }

  render() {
    const { selected, deselected, isMax } = this.props
    const { remainingTime } = this.state
    
    return (
      <section className="deselect-cnt">
        <MainBlock className="deselect-cnt-block">
          <Steps />
        </MainBlock>
        <div className="deselect-cnt-info">
          <p>
            This is your <span>{`5 destinations`}</span>
          </p>

          {remainingTime ? (
            <p>
              Remainging time: <span>{remainingTime}</span>
            </p>
          ) : null}

          {deselected.length > 0 && (
            <Button
              text="undo deselection"
              variant="gray"
              onClick={this.onClear}
              icon="undo"
            />
          )}
        </div>
        <section className="deselect-cnt-destinations">
          {selected.map((item: any) => {
            
            const isSome = deselected.some(
              (deselected: ISelectedData) => deselected.tripId === item.tripId
            )

            return !isSome ? (
              
              <Destination
                index={item.tripId}
                key={item.tripId}
                data={item}
                onDeselect={this.onDeselect}
                isMax={isMax}
                deselect
              />
            ) : null
          })}
        </section>

        <SelectPanel
          step={STEP_IDS.DESELECT}
          selected={selected}
          deselected={deselected}
          isMax={isMax}
          max={MAX}
          onNext={this.onNext}
          onBack={this.onBack}
        />
      </section>
    )
  }
}

const mapStateToProps = (state: IStore) => ({
  isMax: selectIsMaxDeselected(state),
  selected: selectSelected(state),
  deselected: selectDeselected(state)
})

const composeHOCs = compose(
  DeselectContainer,
  withCountdown,
  withToast
)

export default connect(
  mapStateToProps,
  { clearDeselected, addDeselected }
)(composeHOCs)
