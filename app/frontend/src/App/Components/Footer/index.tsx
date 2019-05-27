import React from 'react'
import './styles.scss'
import logo from '../../../Common/Utils/Media/logo_blue.png'
import { NavLink } from 'react-router-dom'

const Footer: React.SFC<{}> = () => {
  const pages = ['faq', 'support', 'terms and conditions', 'privacy policy']

  return (
    <div className="footer">
      <NavLink to="/">
        <img src={logo} />
      </NavLink>
      <div className="footer-links">
        {pages.map((e, i) => (
          <NavLink
            key={`/${e.replace(' ', '-')}`}
            className="footer-link"
            to={`/${e.replace(' ', '-')}`}>
            {e.toUpperCase()}
          </NavLink>
        ))}
        <a href="mailto:partner@sponteous.com" className="footer-link">
          {'become a partner'.toUpperCase()}
        </a>
      </div>
    </div>
  )
}

export default Footer
