import React from 'react'
// import { withRouter } from 'react-router-dom'

import MainBlock from '../MainBlock'
import Title from '../Title'
// import LoadingGif from '../../Utils/Media/loading.gif'

import { ISelectedData } from '../../Utils/appTypes'
import { IProps } from './types'
import './styles.scss'

// const LinkButton = withRouter(({ history }) => (
//   <button
//     children={['CANCEL']}
//     className="preloader-cancel"
//     onClick={() => history.push('/destinations/payment')}
//   />
// ))

const Preloader: React.SFC<IProps> = ({ selected }) => (
  <MainBlock className="preloader">
    {/* <div className="preloader-dice"> */}
      <div className="preloader-spon-loader">
        <div className="preloader-spon-loader__backdrop" />
        <div className="preloader-spon-loader__container">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    {/* </div> */}
    <Title
      className="preloader-title"
      selected={['Sponteous']}
      text="Get ready to discover your Sponteous trip!"
    />
    <div className="preloader-thumbnails">
      {selected.map((item: ISelectedData) => (
        <img key={item.tripId} src={item.photo} alt={item.destination.name} />
      ))}
    </div>
    {/* <LinkButton /> */}
  </MainBlock>
)

export default Preloader
