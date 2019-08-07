import React, { Component } from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import burger from '../../Utils/Media/burger.svg'
import logo from '../../Utils/Media/logo.png'
import logoBlue from '../../Utils/Media/logo_blue.png'
import cross from '../../Utils/Media/cross.svg'
import userIcon from '../../Utils/Media/user.svg'

import { IStore } from '../../Redux/types'
import { selectUserEmail, selectIsUserLogged } from '../../Redux/Services/user'
import { ADMIN_ROUTING } from '../../../Admin/Utils/constants'
import { IProps, IState } from './types'
import './styles.scss'

class NavBar extends Component<IProps, IState> {
  state: Readonly<IState> = {
    burgerOpen: false
  }

  toggleBurger = () =>
    this.setState((prevState: IState) => ({
      burgerOpen: !prevState.burgerOpen
    }))
  disableBurger = () => this.setState({ burgerOpen: false })

  render() {
    const { burgerOpen } = this.state
    const { isAdminPage, openPopup, email, isLoggedIn } = this.props

    const navbarClass = classNames('navbar', {
      'navbar--open': burgerOpen,
      'navbar--close': !burgerOpen,
      'navbar--admin': isAdminPage
    })

    const classWithBurger = (className: string) =>
      classNames(className, {
        [`${className}--open`]: burgerOpen,
        [`${className}--close`]: !burgerOpen
      })

    return (
      <div className={navbarClass}>
        <div className="navbar__header">
          <div className="navbar__logo">
            <NavLink to="/" onClick={this.disableBurger}>
              <img src={burgerOpen ? logoBlue : logo} alt="logo" />
            </NavLink>
          </div>

          <div className="navbar__burger" onClick={this.toggleBurger}>
            <img src={burgerOpen ? cross : burger} alt="burger" />
          </div>
        </div>

        <div className={classWithBurger('navbar__links')}>
          {!isLoggedIn ? (
            <>
              <NavLink
                className={classWithBurger('navbar__link')}
                to="/faq"
                onClick={this.disableBurger}>
                FAQ
              </NavLink>

              <NavLink
                className={classWithBurger('navbar__link')}
                to="/support"
                onClick={this.disableBurger}>
                SUPPORT
              </NavLink>
            </>
          ) : null}

          {isLoggedIn ? (
            <>
             <NavLink
                className={classWithBurger('navbar__link')}
                to={`${ADMIN_ROUTING.MAIN}${ADMIN_ROUTING.CITIES}`}>
                CITIES
              </NavLink>
              <NavLink
                className={classWithBurger('navbar__link')}
                to={`${ADMIN_ROUTING.MAIN}${ADMIN_ROUTING.TRIPS}`}>
                TRIPS
              </NavLink>

              <NavLink
                className={classWithBurger('navbar__link')}
                to={`${ADMIN_ROUTING.MAIN}${ADMIN_ROUTING.TICKETS}`}>
                TICKETS
              </NavLink>

              <NavLink
                className={classWithBurger('navbar__link')}
                to={`${ADMIN_ROUTING.MAIN}${ADMIN_ROUTING.ORDERS}`}>
                ORDERS
              </NavLink>


              <NavLink
                className={classWithBurger('navbar__link')}
                to={`${ADMIN_ROUTING.MAIN}${ADMIN_ROUTING.USERS}`}>
                USERS
              </NavLink>
            </>
          ) : null}
        </div>

        {isAdminPage ? (
          <div className="navbar__admin">
            {/* <div className="navbar__admin-email">
              <img src={userIcon} alt="" />
              <span>{email.toUpperCase()}</span>
            </div> */}
            
            <NavLink
              className={classWithBurger('navbar__admin-email')}
              to={`${ADMIN_ROUTING.MAIN}${ADMIN_ROUTING.ACCOUNT}`}>
              <img src={userIcon} alt="" />
              <span>{email.toUpperCase()}</span>
            </NavLink>
            <button
              onClick={openPopup}
              className="navbar__link navbar__link--logout">
              LOGOUT
            </button>
          </div>
        ) : null} 
        
      </div>
    )
  }
}

const mapStateToProps = (state: IStore) => ({
  email: selectUserEmail(state),
  isLoggedIn: selectIsUserLogged(state)
})

export default connect(mapStateToProps)(NavBar)
