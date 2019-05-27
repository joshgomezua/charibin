import React from 'react'
import classnames from 'classnames'
import { IProps } from './types'
import './styles.scss'

const Loader: React.SFC<IProps> = ({ isStatic }) => {
  const loaderClassname = classnames('spon-loader', {
    'spon-loader--static': isStatic
  })

  return (
    <div className={loaderClassname}>
      <div className="spon-loader__backdrop" />
      <div className="spon-loader__container">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

export default Loader
