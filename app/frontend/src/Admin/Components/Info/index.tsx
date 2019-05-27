import React from 'react'
import classnames from 'classnames'
import { IProps } from './types'
import './styles.scss'

const Info: React.SFC<IProps> = ({ className, isError = false, children }) => {
  const infoClassnames = classnames('spon-info', 'animated', 'fadeInLeft', {
    [`${className}`]: className,
    'spon-info--error': isError
  })
  return children && children.toString().length > 0 ? (
    <div className={infoClassnames}>{children}</div>
  ) : null
}

export default Info
