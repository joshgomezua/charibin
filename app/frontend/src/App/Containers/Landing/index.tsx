import React, { Component } from 'react'
import { connect } from 'react-redux'

import MainBlock from '../../Components/MainBlock'
import Title from '../../Components/Title'
import Search from '../../Components/Search'
import Slider from '../../Components/Slider'
import Footer from '../../Components/Footer'
import ScrollStatic from '../../Statics/ScrollStatic'
import WhySponteousStatic from '../../Statics/WhySponteous'
import ReadFaqStatic from '../../Statics/ReadFaq'

import {
  setQuantity,
  selectQuantity,
  selectDeparture,
  setDeparture
} from '../../../Common/Redux/Services/trips'
import { IStore } from '../../../Common/Redux/types'
import { RouteComponentProps } from 'react-router-dom'
import { IProps } from './types'
import './styles.scss'

class LandingContainer extends Component<RouteComponentProps<{}> & IProps> {
  private slider = React.createRef<HTMLDivElement>()

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.history.push('/destinations/select')
  }

  onScrollClick = () => {
    document.getElementById('slider')!.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    return (
      <section className="landing-cnt">
        <MainBlock>
          <Title
            text="Get your cheap tickets to the Unknown"
            selected={['Unknown']}
          />
          <Search
            setQuantity={this.props.setQuantity}
            quantity={this.props.quantity}
            setDeparture={this.props.setDeparture}
            onSubmit={this.onSubmit}
            initialValue={this.props.departure}
            departure={this.props.departure}
          />
          <ScrollStatic onClick={this.onScrollClick} />
        </MainBlock>
        <Slider sliderRef={this.slider} />
        <ReadFaqStatic />
        <WhySponteousStatic />
        <Footer />
      </section>
    )
  }
}

const mapStateToProps = (state: IStore) => ({
  quantity: selectQuantity(state),
  departure: selectDeparture(state)
})

export default connect(
  mapStateToProps,
  { setQuantity , setDeparture}
)(LandingContainer)
