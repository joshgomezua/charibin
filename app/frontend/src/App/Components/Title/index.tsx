import React from 'react'
import { IProps } from './types'
import './styles.scss'

const Title: React.SFC<IProps> = ({
  text,
  selected,
  className = '',
  left = false,
  right = false
}) => {
  let content = text
  if (selected && selected.length > 0) {
    selected.forEach((item: string) => {
      const escaped = item.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
      const regex = new RegExp(escaped, 'g')
      content = content.replace(regex, `<span>${item}</span>`)
    })
  }
  return (
    <p
      className={`title ${className} ${left ? 'left' : ''} ${
        right ? 'right' : ''
      }`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default Title
