import React from 'react'
import classnames from 'classnames'
import { IProps, IState } from './types'
import './styles.scss'

class Modal extends React.Component<IProps, IState> {
  state: Readonly<IState> = {
    isOpen: false
  }

  open = () => {
    this.setState({ isOpen: true })
  }

  close = () => {
    const { restartModalType } = this.props

    this.setState({ isOpen: false })
    restartModalType && restartModalType()
  }

  handleToggle = () =>
    this.setState(
      (state: IState) => ({ isOpen: !state.isOpen }),
      () => {
        const { isOpen } = this.state
        const { restartModalType } = this.props

        if (!isOpen && restartModalType) {
          restartModalType()
        }
      }
    )

  render() {
    const { title, children } = this.props
    const modalClassName = classnames('spon-modal', {
      'spon-modal--visible': this.state.isOpen
    })

    return (
      <div className={modalClassName}>
        <div className="spon-modal__backdrop" onClick={this.handleToggle} />
        <div className="spon-modal__card">
          <div className="spon-modal__header">
            <div className="spon-modal__title">{title}</div>
            <button onClick={this.handleToggle}>
              <span />
              <span />
            </button>
          </div>
          <div className="spon-modal__content">{children}</div>
        </div>
      </div>
    )
  }
}

export default Modal
