import React from 'react'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps } from 'react-router'
import { ADMIN_ROUTING } from '../Utils/constants'
import { selectIsUserLogged } from '../../Common/Redux/Services/user'
import { IStore } from '../../Common/Redux/types'
interface IProps {
  isLogged: boolean
}

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  class WithAuthorized extends React.Component<
    P & RouteComponentProps<{}> & IProps
  > {
    render() {
      if (!this.props.isLogged) {
        return <Redirect to={`${ADMIN_ROUTING.MAIN}${ADMIN_ROUTING.LOGIN}`} />
      }

      return <Component {...this.props} />
    }
  }

  const mapStateToProps = (state: IStore) => ({
    isLogged: selectIsUserLogged(state)
  })

  return connect(mapStateToProps)(WithAuthorized as React.ComponentType)
}

export default withAuth
