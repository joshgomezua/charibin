import React from 'react'
import { default as SwitchComp } from 'rc-switch'
import { IProps } from './types'
import './styles.scss'

const Switch: React.SFC<IProps> = ({ checked, onChange }) => (
  <SwitchComp checked={checked} prefixCls="spon-switch" onChange={onChange} />
)

export default Switch
