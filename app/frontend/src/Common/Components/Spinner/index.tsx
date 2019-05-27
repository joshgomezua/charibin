import React from 'react'
import { IProps } from './types'
import './styles.scss'

const Spinner = ({
  className,
  width = '23',
  height = '23',
  fill = null,
  type
}: IProps) => {
  return (
    <svg
      className={`spon-spinner ${className}`}
      width={width}
      height={height}
      viewBox="0 0 32 32">
      <path
        fill={fill || (type && type === 'solid') ? 'white' : '#0574da'}
        fillRule="nonzero"
        d="M23.563 8.438l3.125-3.125v9.375h-9.375l4.313-4.313c-1.438-1.438-3.438-2.375-5.625-2.375-4.438 0-8 3.563-8 8s3.563 8 8 8c3.5 0 6.5-2.188 7.563-5.313h2.75c-1.188 4.625-5.313 8-10.313 8-5.875 0-10.625-4.813-10.625-10.688s4.75-10.688 10.625-10.688c2.938 0 5.625 1.188 7.563 3.125z"
      />
    </svg>
  )
}

export default Spinner
