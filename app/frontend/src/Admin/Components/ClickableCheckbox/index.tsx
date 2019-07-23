import React from 'react'
import classnames from 'classnames'
import { IProps } from './types'
import './styles.scss'

const Checkbox: React.SFC<IProps> = ({
  id,
  ref,
  className,
  isChecked,
  handleChange,
  label
}) => {
  const checkboxClassName = classnames('spon-checkbox', {
    'spon-checkbox--is-label': label,
    [`${className}`]: className
  })

  return (
    <div className={checkboxClassName}>
      <input
        id={id}
        name="checkbox"
        type="checkbox"
        className="spon-checkbox"
        checked={isChecked}
        ref={ref}
        onChange={() => handleChange}
			/>
      <div className="spon-checkbox__icon" />

      {label ? <label htmlFor={id}>{label}</label> : null}
    </div>
  )
}

export default Checkbox
