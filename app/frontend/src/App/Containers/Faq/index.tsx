import React, { Component } from 'react'

import Collapse from '../../Components/Collapse'
import Title from '../../Components/Title'
import MainBlock from '../../Components/MainBlock'
import Footer from '../../Components/Footer'

import { RouteComponentProps } from 'react-router-dom'
import { FAQ_CONTENT } from '../../Utils/constants'
import './styles.scss'

export default class FaqContainer extends Component<RouteComponentProps<{}>> {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <>
        <section className="faq-cnt">
          <MainBlock>
            <Title
              text="Do you have any questions? Here is our FAQ"
              selected={['FAQ']}
              className="faq-title"
            />
          </MainBlock>
          <div className="faq-wrapper">
            {FAQ_CONTENT.map(({ title, content }, i) => (
              <Collapse key={i} header={<h3>{title}</h3>} top={!i}>
                {content}
              </Collapse>
            ))}
          </div>
        </section>
        <Footer />
      </>
    )
  }
}
