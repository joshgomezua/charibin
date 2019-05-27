import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { setInitialState } from '../../Common/Redux/Services/trips'
import { calculateTimeDiff } from '../../App/Utils/helpers'
import { removeFromLS } from '../../Common/Utils/helpers'

interface IProps {
  setInitialState: () => void
  countdown: (date: Date | string) => void
}

const withCountdown = <P extends IProps>(Component: React.ComponentType<P>) => {
  return class WithCountdownComponent extends React.Component<P> {
    countdown = (
      date: Date | string,
      showSuccess: (message: string) => void,
      pushHistory: (path: string) => void,
      setRemainingTime: (time: string) => void,
      interval: any
    ) => {
      const diff = calculateTimeDiff(date)
      const { setInitialState } = this.props

      if (diff) {
        setRemainingTime(diff)
      } else {
        clearInterval(interval)
        setInitialState()
        removeFromLS('owner')
        showSuccess('Time ends')
        pushHistory('/destination/select')
      }
    }

    render() {
      return <Component {...this.props} countdown={this.countdown} />
    }
  }
}

const composedHoc = compose(
  connect(
    null,
    { setInitialState }
  ),
  withCountdown
)

export default composedHoc
