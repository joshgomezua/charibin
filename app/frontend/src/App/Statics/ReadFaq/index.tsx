import React from 'react'
import { withRouter } from 'react-router-dom'
import BlueButton from '../../Components/BlueButton'
import Title from '../../Components/Title'
import readFaq from '../../Utils/Media/read_faq_static.png'
import './styles.scss'

const LinkButton = withRouter(({ history }) => (
  <BlueButton
    children={['READ FAQ']}
    className="read_faq-button"
    onClick={() => history.push('/faq')}
  />
))

export default () => (
  <div className="read_faq">
    <div>
      <img src={readFaq} />
    </div>
    <div className="read_faq-paragraph">
      <Title
        className="read_faq-title"
        text="HOW ARE WE ABLE TO DO THIS"
        selected={['HOW', 'ABLE']}
      />
      <Title
        className="read_faq-header"
        left
        text="We fill unsold seats with spontaneous travelers"
        selected={['spontaneous']}
      />
      <p className="read_faq-label">You save your moola and make carriers happy</p>
      <LinkButton />
    </div>
  </div>
)
