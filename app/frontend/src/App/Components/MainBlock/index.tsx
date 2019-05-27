import React from 'react'
import { IProps } from './types'
import './styles.scss'

const MainBlock: React.SFC<IProps> = ({
  children,
  noPadding = false,
  className = '',
  nonFlex = false
}) => (
  <section
    className={`mainblock ${noPadding ? '' : 'padding'} ${
      nonFlex ? '' : 'flex'
    } ${className}`}>
    {children || null}
  </section>
)

export default MainBlock
