import React from 'react'
import Title from '../../Components/Title'
import { WHY_ITEMS } from '../../Utils/constants'
import './styles.scss'

export default () => (
  <div className="why_static">
    <Title text="Why Sponteous?" selected={['Why']} className="why_static-title" />
    <div className="why_static-list">
      {WHY_ITEMS.map(({ icon, title, text }, i) => (
        <div key={i} className={`why_static-item${i === 1 ? ' border' : ''}`}>
          <div>
            <img src={icon} />
          </div>
          <p>{title}</p>
          <p>{text}</p>
        </div>
      ))}
    </div>
  </div>
)
