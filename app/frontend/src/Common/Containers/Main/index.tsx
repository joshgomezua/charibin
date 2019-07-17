import React, { Component } from 'react'
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps
} from 'react-router-dom'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import Admin from '../../../Admin/Containers/Main'
import Landing from '../../../App/Containers/Landing'
import Faq from '../../../App/Containers/Faq'
import Support from '../../../App/Containers/Support'
import Login from '../../../Admin/Containers/Login'
import Destinations from '../../../App/Containers/Destinations'
import NavBar from '../../Components/NavBar'
import Button from '../../../Common/Components/Button'
import Modal from '../../../Admin/Components/Modal'
import GDPRBar from '../../../App/Components/GDPRBar'

import { logoutUser } from '../../Redux/Services/user'
import withAuth from '../../../Admin/HOC/withAuth'
import { getFromLS, saveToLS } from '../../Utils/helpers'
import { ADMIN_ROUTING } from '../../../Admin/Utils/constants'
import { IState, IProps } from './types'
import 'animate.css'
import './styles.scss'

class MainContainer extends Component<
  RouteComponentProps<{}> & IProps,
  IState
> {
  modal = React.createRef<Modal>()

  handleLogout = () => {
    this.props.logoutUser()
    this.modal.current!.close()
    this.props.history.push(`${ADMIN_ROUTING.MAIN}${ADMIN_ROUTING.LOGIN}`)
  }

  handleAcceptGDPR = () => {
    saveToLS('gdpr', 'true')
  }

  render() {
    const { location } = this.props
    const isLoginPage = location.pathname.includes('login')
    const isAdminPage = location.pathname.includes('admin')
    const isDestination =
      location.pathname.includes('destinations/select') ||
      location.pathname.includes('destinations/deselect')
    const isGdprAccepted = getFromLS('gdpr')

    return (
      <section className="spon-main">
        {!isLoginPage ? (
          <NavBar
            openPopup={() => this.modal.current!.open()}
            isAdminPage={isAdminPage && !isLoginPage}
          />
        ) : null}
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/support" component={Support} />
          <Route path="/destinations" component={Destinations} />
          <Route
            exact
            path={`${ADMIN_ROUTING.MAIN}${ADMIN_ROUTING.LOGIN}`}
            component={Login}
          />
          <Route path={ADMIN_ROUTING.MAIN} component={withAuth(Admin)} />
          

          <Redirect to="/" />
        </Switch>

        <ToastContainer className="spon-toast" />

        {!isGdprAccepted ? (
          <GDPRBar
            isDestination={isDestination}
            onAccept={this.handleAcceptGDPR}
          />
        ) : null}

        <Modal ref={this.modal} title="Logout">
          <div>Are you sure you want to logout?</div>
          <div className="spon-main__popup">
            <Button
              onClick={() => this.modal.current!.close()}
              variant="adminSecondary"
              text="No"
            />
            <Button
              onClick={this.handleLogout}
              variant="adminPrimary"
              text="Yes"
            />
          </div>
        </Modal>
      </section>
    )
  }
}

export default withRouter(
  connect(
    null,
    { logoutUser }
  )(MainContainer)
)
