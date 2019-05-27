import React, { Component } from 'react'
import { Swipeable } from 'react-touch'
import { CSSTransition } from 'react-transition-group'
import Title from '../../Components/Title'
import { STEPS } from '../../Utils/constants'
import { State, IProps } from './types'
import './styles.scss'

const RADIUS = 35
const STROKE = 3

export default class Slider extends Component<IProps, State> {
  state = {
    currentStep: 0,
    progress: 0,
    animation: false
  }

  normalizedRadius = RADIUS - STROKE * 2
  circumference = this.normalizedRadius * 2 * Math.PI
  timer: any = null

  componentDidMount() {
    this.setTimer()
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  timerHandler = () => {
    this.setState(
      (prevState): any => {
        if (prevState.progress >= 700) {
          return {
            progress: 0,
            currentStep:
              prevState.currentStep + 1 <= STEPS.length - 1
                ? prevState.currentStep + 1
                : 0,
            animation: true
          }
        }

        return {
          progress: prevState.progress + 1
        }
      }
    )
  }

  setTimer = () => {
    this.timer = setInterval(this.timerHandler, 10)
  }

  clearTimer = () => {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  resetAnimation = () => this.setState({ animation: false })

  back = () => {
    const { currentStep } = this.state
    if (currentStep - 1 >= 0) {
      this.setState(prevState => ({ currentStep: prevState.currentStep - 1 }))
    }
  }

  forward = () => {
    const { currentStep } = this.state

    if (currentStep + 1 <= STEPS.length - 1) {
      this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }))
    } else {
      this.setState({ currentStep: 0 })
    }
  }

  setCurrent = (step: number) => {
    this.setState({ currentStep: step })
  }

  render() {
    const { currentStep, progress, animation } = this.state
    const { sliderRef } = this.props
    const strokeDashoffset =
      this.circumference - (progress / 700) * this.circumference
    return (
      <Swipeable onSwipeLeft={this.forward} onSwipeRight={this.back}>
        <section id="slider" className="slider">
          <div ref={sliderRef} className="slider-info">
            <p>
              how it works: <span>{STEPS[currentStep].name}</span>
            </p>
            <Title
              left
              className="slider-info-title"
              text={STEPS[currentStep].title}
              selected={STEPS[currentStep].selected}
            />
            <p>{STEPS[currentStep].description}</p>
            <div
              className="slider-info-buttons"
              onMouseEnter={this.clearTimer}
              onMouseLeave={this.setTimer}>
              <button onClick={this.back}>
                <svg height={RADIUS * 2} width={RADIUS * 2}>
                  <circle
                    className="slider-info-button-normal"
                    strokeWidth={STROKE}
                    r={this.normalizedRadius}
                    cx={RADIUS}
                    cy={RADIUS}
                  />
                </svg>
                <span>{'<'}</span>
              </button>
              <button onClick={this.forward}>
                <svg height={RADIUS * 2} width={RADIUS * 2}>
                  <circle
                    className="slider-info-button-normal"
                    strokeWidth={STROKE}
                    r={this.normalizedRadius}
                    cx={RADIUS}
                    cy={RADIUS}
                  />
                  <circle
                    className="slider-info-button-progress"
                    strokeWidth={STROKE}
                    strokeDasharray={
                      this.circumference + ' ' + this.circumference
                    }
                    style={{ strokeDashoffset }}
                    r={this.normalizedRadius}
                    cx={RADIUS}
                    cy={RADIUS}
                  />
                </svg>
                <span>{'>'}</span>
              </button>
            </div>
          </div>
          <div className="slider-img">
            <CSSTransition
              in={animation}
              classNames="slider-animation"
              timeout={700}
              onEntered={this.resetAnimation}>
              <img src={STEPS[currentStep].image} alt="step" />
            </CSSTransition>
          </div>
          <div className="slider-dots">
            {STEPS.map((step, index: number) => (
              <div
                onClick={() => this.setCurrent(index)}
                key={step.name}
                className={`slider-dot ${
                  currentStep === index ? 'slider-dot--active' : ''
                }`}
              />
            ))}
          </div>
        </section>
      </Swipeable>
    )
  }
}
