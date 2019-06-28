import React from 'react'
import classnames from 'classnames'
import { FieldProps } from 'formik'
import { IProps } from './types'
import './styles.scss'

const Input: React.SFC<FieldProps & IProps> = ({
  field,
  type,
  label,
  placeholder,
  className,
  classNamelabel,
  isPrefix,
  isSuffix
}) => {
  const inputClassName = classnames('spon-input', {
    [`${className}`]: className,
    'spon-input--prefix': isPrefix,
    'spon-input--suffix': isSuffix
  })

  return (
    <div className={inputClassName}>
      {label ? <label className={classNamelabel? classNamelabel:"spon-input__label"}>{label}</label> : null}

      <div className="spon-input__cnt">
        {isPrefix ? <span>£</span> : null}
        <input
          name={field.name}
          placeholder={placeholder}
          type={type}
          min={type === 'number' ? '0' : ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
        />
        {isSuffix ? <span>%</span> : null}
      </div>
    </div>
  )
}

export default Input
