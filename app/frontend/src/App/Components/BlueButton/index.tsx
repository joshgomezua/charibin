import React from 'react'
import { Button } from 'antd'
import arrow from '../../../Common/Utils/Media/arrowRight.svg'
import { IProps } from './types'
import './styles.scss'

const BlueButton: React.SFC<IProps> = ({ className, ...props }) => (
  <Button {...props} className={`button ${className ? className : ''}`}>
    {props.children}
    <span className="arrow">
      <img src={arrow} className="arrow-icon" />
    </span>
  </Button>
)

export default BlueButton
