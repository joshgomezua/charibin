import React from 'react'
import { IProps, IState } from './types'
import './styles.scss'

export default class Collapse extends React.Component<IProps, IState> {
  state = {
    visible: false
  }

  render() {
    const {
      props: { header, top, children },
      state: { visible }
    } = this
    const visibleClass = visible ? ' open' : ''

    return (
      <div className={`collapse${top ? ' top-border' : ''}`}>
        <div className="collapse-header" onClick={() => this.setState({ visible: !visible })}>
          <div className="collapse-header-wrapper">{header}</div>
          <div>
            <button role="button" className={`collapse-icon${visibleClass}`}>
              <span className="collapse-bar" />
              <span className={`collapse-bar vertical${visibleClass}`} />
            </button>
          </div>
        </div>
        <div className={`collapse-content${visibleClass}`}>{children}</div>
      </div>
    )
  }
}
