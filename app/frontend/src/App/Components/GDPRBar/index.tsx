import React from 'react'
import Button from '../../../Common/Components/Button'
import './styles.scss'

interface IProps {
  isDestination: boolean
  onAccept: () => void
}

interface IState {
  isAccepted: boolean
}

class GDPRBar extends React.Component<IProps, IState> {
  readonly state: IState = {
    isAccepted: false
  }

  handleAccept = () => {
    this.setState({ isAccepted: true })
    this.props.onAccept()
  }
  render() {
    const { isAccepted } = this.state
    const { isDestination } = this.props

    return (
      <div
        className={`spon-gdpr ${isAccepted ? 'animated slideOutDown' : ''} ${
          isDestination ? 'spon-gdpr--is-destination' : ''
        }`}>
        <p>We use cookies to give you the best experience on our website</p>
        <Button text="Accept" variant="green" onClick={this.handleAccept} />
      </div>
    )
  }
}
export default GDPRBar
