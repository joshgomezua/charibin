import React, { Component } from 'react'
import { Swipeable } from 'react-touch'
import { CSSTransition } from 'react-transition-group'
import Title from '../../Components/Title'
import { STEPS } from '../../Utils/constants'
import { State, IProps } from './types'
import './styles.scss'
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

const RADIUS = 35
const STROKE = 3
declare var $: any;

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
    if ($('.jq-slider').slick) $('.jq-slider').slick({
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      infinite: true
    });
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

  onSlide = () => {
    this.disableScroll()
  }

  slideEnd = () => {
    setTimeout(() => {
      this.enableScroll()
    }, 100);
  }

  preventDefault = (e: any) => {
    e.preventDefault();
  }

  disableScroll = () => {
    document.body.addEventListener('touchmove', this.preventDefault, { passive: false });
  }
  
  enableScroll = () => {
    document.body.removeEventListener('touchmove', this.preventDefault);
  }

  render() {
    // const responsive = {
    //   superLargeDesktop: {
    //     // the naming can be any, depends on you.
    //     breakpoint: { max: 4000, min: 3000 },
    //     items: 1,
    //   },
    //   desktop: {
    //     breakpoint: { max: 3000, min: 1024 },
    //     items: 1,
    //   },
    //   tablet: {
    //     breakpoint: { max: 1024, min: 464 },
    //     items: 1,
    //   },
    //   mobile: {
    //     breakpoint: { max: 464, min: 0 },
    //     items: 1,
    //   },
    // };

    const { currentStep, progress, animation } = this.state
    const { sliderRef } = this.props
    const strokeDashoffset =
      this.circumference - (progress / 700) * this.circumference
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile)
      return (

        <div className="margine">
          <div className="jq-slider">
            <div> <section id="slider" className="slider">
              <div ref={sliderRef} className="slider-info">
                <p>
                  how it works: <span>{STEPS[0].name}</span>
                </p>
                <Title
                  left
                  className="slider-info-title"
                  text={STEPS[0].title}
                  selected={STEPS[0].selected}
                />
                <p>{STEPS[0].description}</p>
                <div
                  className="slider-info-buttons"
                  onMouseEnter={this.clearTimer}
                  onMouseLeave={this.setTimer}>
                </div>
              </div>
              <div className="slider-img">
                <CSSTransition
                  in={animation}
                  classNames="slider-animation"
                  onEntered={this.resetAnimation}>
                  <img src={STEPS[0].image} alt="step" />
                </CSSTransition>
              </div>
            </section>

            </div>
            <div><section id="slider" className="slider">
              <div ref={sliderRef} className="slider-info">
                <p>
                  how it works: <span>{STEPS[1].name}</span>
                </p>
                <Title
                  left
                  className="slider-info-title"
                  text={STEPS[1].title}
                  selected={STEPS[1].selected}
                />
                <p>{STEPS[1].description}</p>
                <div
                  className="slider-info-buttons"
                  onMouseEnter={this.clearTimer}
                  onMouseLeave={this.setTimer}>
                </div>
              </div>
              <div className="slider-img">
                <CSSTransition
                  in={animation}
                  classNames="slider-animation"
                  onEntered={this.resetAnimation}>
                  <img src={STEPS[1].image} alt="step" />
                </CSSTransition>
              </div>
            </section></div>
            <div><section id="slider" className="slider">
              <div ref={sliderRef} className="slider-info">
                <p>
                  how it works: <span>{STEPS[2].name}</span>
                </p>
                <Title
                  left
                  className="slider-info-title"
                  text={STEPS[2].title}
                  selected={STEPS[2].selected}
                />
                <p>{STEPS[2].description}</p>
                <div
                  className="slider-info-buttons"
                  onMouseEnter={this.clearTimer}
                  onMouseLeave={this.setTimer}>
                </div>
              </div>
              <div className="slider-img">
                <CSSTransition
                  in={animation}
                  classNames="slider-animation"
                  onEntered={this.resetAnimation}>
                  <img src={STEPS[2].image} alt="step" />
                </CSSTransition>
              </div>
            </section></div>
            <div><section id="slider" className="slider">
              <div ref={sliderRef} className="slider-info">
                <p>
                  how it works: <span>{STEPS[3].name}</span>
                </p>
                <Title
                  left
                  className="slider-info-title"
                  text={STEPS[3].title}
                  selected={STEPS[3].selected}
                />
                <p>{STEPS[3].description}</p>
                <div
                  className="slider-info-buttons"
                  onMouseEnter={this.clearTimer}
                  onMouseLeave={this.setTimer}>
                </div>
              </div>
              <div className="slider-img">
                <CSSTransition
                  in={animation}
                  classNames="slider-animation"
                  onEntered={this.resetAnimation}>
                  <img src={STEPS[3].image} alt="step" />
                </CSSTransition>
              </div>
            </section></div>
          </div>
          {/* <Carousel  react-multi-carousel-dot--active  responsive={responsive} 
            swipeable={true}
            draggable={true}
            showDots={true}
            focusOnSelect={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            beforeChange={this.onSlide}
            afterChange={this.slideEnd}
          >
            <div> <section id="slider" className="slider">
              <div ref={sliderRef} className="slider-info">
                <p>
                  how it works: <span>{STEPS[0].name}</span>
                </p>
                <Title
                  left
                  className="slider-info-title"
                  text={STEPS[0].title}
                  selected={STEPS[0].selected}
                />
                <p>{STEPS[0].description}</p>
                <div
                  className="slider-info-buttons"
                  onMouseEnter={this.clearTimer}
                  onMouseLeave={this.setTimer}>
                </div>
              </div>
              <div className="slider-img">
                <CSSTransition
                  in={animation}
                  classNames="slider-animation"
                  onEntered={this.resetAnimation}>
                  <img src={STEPS[0].image} alt="step" />
                </CSSTransition>
              </div>
            </section>

            </div>
            <div><section id="slider" className="slider">
              <div ref={sliderRef} className="slider-info">
                <p>
                  how it works: <span>{STEPS[1].name}</span>
                </p>
                <Title
                  left
                  className="slider-info-title"
                  text={STEPS[1].title}
                  selected={STEPS[1].selected}
                />
                <p>{STEPS[1].description}</p>
                <div
                  className="slider-info-buttons"
                  onMouseEnter={this.clearTimer}
                  onMouseLeave={this.setTimer}>
                </div>
              </div>
              <div className="slider-img">
                <CSSTransition
                  in={animation}
                  classNames="slider-animation"
                  onEntered={this.resetAnimation}>
                  <img src={STEPS[1].image} alt="step" />
                </CSSTransition>
              </div>
            </section></div>
            <div><section id="slider" className="slider">
              <div ref={sliderRef} className="slider-info">
                <p>
                  how it works: <span>{STEPS[2].name}</span>
                </p>
                <Title
                  left
                  className="slider-info-title"
                  text={STEPS[2].title}
                  selected={STEPS[2].selected}
                />
                <p>{STEPS[2].description}</p>
                <div
                  className="slider-info-buttons"
                  onMouseEnter={this.clearTimer}
                  onMouseLeave={this.setTimer}>
                </div>
              </div>
              <div className="slider-img">
                <CSSTransition
                  in={animation}
                  classNames="slider-animation"
                  onEntered={this.resetAnimation}>
                  <img src={STEPS[2].image} alt="step" />
                </CSSTransition>
              </div>
            </section></div>
            <div><section id="slider" className="slider">
              <div ref={sliderRef} className="slider-info">
                <p>
                  how it works: <span>{STEPS[3].name}</span>
                </p>
                <Title
                  left
                  className="slider-info-title"
                  text={STEPS[3].title}
                  selected={STEPS[3].selected}
                />
                <p>{STEPS[3].description}</p>
                <div
                  className="slider-info-buttons"
                  onMouseEnter={this.clearTimer}
                  onMouseLeave={this.setTimer}>
                </div>
              </div>
              <div className="slider-img">
                <CSSTransition
                  in={animation}
                  classNames="slider-animation"
                  onEntered={this.resetAnimation}>
                  <img src={STEPS[3].image} alt="step" />
                </CSSTransition>
              </div>
            </section></div>
          </Carousel> */}
        </div>

      )
    else
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
