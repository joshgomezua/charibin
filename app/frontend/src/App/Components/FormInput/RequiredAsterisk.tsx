import * as React from 'react'
import './styles.scss'

export const RequiredLabel = ({ text }: { text?: string }) =>
  !text ? (
    <span className="asterisk">*</span>
  ) : (
    <>
      <label className="required-label">
        {text}
        <span className="asterisk">*</span>
      </label>
    </>
  )
