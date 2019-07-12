import React from 'react'
import { withRouter } from 'react-router-dom'

import MainBlock from '../MainBlock'
import Title from '../Title'
import DiceGif from '../../Utils/Media/dice.gif'

import { ISelectedData } from '../../Utils/appTypes'
import { IProps } from './types'
import './styles.scss'

const LinkButton = withRouter(({ history }) => (
  <button
    children={['CANCEL']}
    className="preloader-cancel"
    onClick={() => history.push('/destinations/payment')}
  />
))

const Preloader: React.SFC<IProps> = ({ selected }) => (
  <MainBlock className="preloader">
    <div className="preloader-dice">
      <img src={DiceGif} alt="" />
    </div>
    <Title
      className="preloader-title"
      selected={['Sponteous']}
      text="Are you ready for your Sponteous trip?"
    />
    <div className="preloader-thumbnails">
      {selected.map((item: ISelectedData) => (
        <img key={item.tripId} src={item.photo} alt={item.destination} />
      ))}
    </div>
    <LinkButton />
  </MainBlock>
)

export default Preloader
