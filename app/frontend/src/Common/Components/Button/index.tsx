import React from 'react'
import classnames from 'classnames'

import Spinner from '../Spinner'

import { IProps } from './types'
import './styles.scss'

const ICONS = {
  plus: require('../../Utils/Media/plus.svg'),
  cross: require('../../Utils/Media/cross.svg'),
  crossWhite: require('../../Utils/Media/crossWhite.svg'),
  arrowRight: require('../../Utils/Media/arrowRight.svg'),
  arrowLeft: require('../../Utils/Media/arrowLeft.svg'),
  undo: require('../../Utils/Media/undo.svg'),
  trash: require('../../Utils/Media/trash.svg'),
  pencil: require('../../Utils/Media/pencil.svg'),
  arrowLeftUpdated: require('../../Utils/Media/arrowLeftUpdated.svg')
}

const Button = ({
  disabled,
  onClick,
  text,
  icon,
  isLoading,
  className = '',
  variant = 'blue',
  type = 'button'
}: IProps) => {
  const buttonClass = classnames('spon-btn', {
    [`${className}`]: className,
    [`${variant}`]: variant,
    loading: isLoading
  })

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonClass}>
      {isLoading ? (
        <Spinner className="spon-btn-spinner" fill="#ffffff" />
      ) : (
        <span>{text}</span>
      )}
      {icon &&
        !isLoading && (
          <div>
            <img src={ICONS[icon]} alt="icon" />
          </div>
        )}
    </button>
  )
}

export default Button
