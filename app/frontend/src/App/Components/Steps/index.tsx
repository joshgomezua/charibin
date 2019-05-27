import React from 'react'
import Title from '../Title'
import { NavLink } from 'react-router-dom'
import { HEADER_STEPS } from '../../Utils/constants'
import { IStep } from './types'
import './styles.scss'

const Steps: React.SFC<{}> = () => (
  <section className="steps">
    {HEADER_STEPS.map((step: IStep) => (
      <NavLink
        key={step.number}
        className="steps-template"
        to={step.link}
        onClick={(e: any) => e.preventDefault()}>
        <div className="steps-template-cnt">
          <p>{`STEP ${step.number}`}</p>
          <div className="steps-template-cnt-inner">
            <Title left text={step.title} selected={step.selected} />
            <img src={step.image} alt="icon" />
          </div>
        </div>
      </NavLink>
    ))}
  </section>
)

export default Steps
