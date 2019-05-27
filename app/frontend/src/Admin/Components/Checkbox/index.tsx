import React from 'react'
import classnames from 'classnames'
import { IProps } from './types'
import './styles.scss'

const Checkbox: React.SFC<IProps> = ({
  id,
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
        type="checkbox"
        name="checkbox"
        checked={isChecked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange ? handleChange() : e.preventDefault()
        }}
      />
      <div className="spon-checkbox__icon" />

      {label ? <label htmlFor={id}>{label}</label> : null}
    </div>
  )
}

export default Checkbox
