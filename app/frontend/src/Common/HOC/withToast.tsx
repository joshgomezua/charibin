import React from 'react'
import { toast } from 'react-toastify'

import { ERRORS } from '../Utils/constants'
import { IResponseError } from '../Utils/globalTypes'
import { isErrorMessage, isStatusText } from '../Utils/helpers'

interface IWithToastProps {
  showError: (err: IResponseError, defaultText?: string) => void
  showSuccess: (msg: string) => void
}

const withToast = <P extends IWithToastProps>(
  Component: React.ComponentType<P>
) => {
  class WithToast extends React.Component<P> {
    showError = (msg: string) => {
      this.setState({ isLoading: false }, () => {
        toast.error(msg, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
    }

    showSuccess = (msg: string) => {
      this.setState({ isLoading: false }, () => {
        toast.success(msg, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
    }

    handleShowErrorMessage = (err: IResponseError, defaultText?: string) => {
      if (isErrorMessage(err.response)) {
        this.showError(err.response.data!.message)
      } else if (isStatusText(err.response)) {
        this.showError(err.response.statusText)
      } else {
        this.showError(defaultText ? defaultText : ERRORS.DEFAULT)
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          showError={this.handleShowErrorMessage}
          showSuccess={this.showSuccess}
        />
      )
    }
  }

  return WithToast
}

export default withToast
