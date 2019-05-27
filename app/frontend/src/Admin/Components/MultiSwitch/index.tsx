import React from 'react'
import Checkbox from '../Checkbox'
import { IProps, ICity, IDay } from './types'
import './styles.scss'

export default class MultiSwitch extends React.Component<IProps> {
  handleChecked = (item: ICity | IDay): boolean => {
    const { isMulti, selectedValues } = this.props

    if (isMulti) {
      return (
        selectedValues.includes(item.name) || selectedValues.includes(item._id)
      )
    } else {
      return selectedValues[0] === item.name || selectedValues[0] === item._id
    }
  }

  renderCheckBox = (item: ICity, index: number) => {
    const { onChange } = this.props
    return (
      <div
        key={item._id}
        className={`spon-multiswitch-item ${index === 0 ? 'first' : ''}`}>
        <Checkbox
          id={`${item._id}`}
          className="spon-multiswitch-item__checkbox"
          isChecked={this.handleChecked(item)}
          label={item.name}
          handleChange={() => {
            onChange(item.name, item._id)
          }}
        />
      </div>
    )
  }
  render() {
    const { items, className, heading } = this.props
    return (
      <div className={`spon-multiswitch ${className ? className : ''}`}>
        {heading ? (
          <h4 className="spon-multiswitch-heading">{heading}</h4>
        ) : null}
        <div className="spon-multiswitch__items">
          {items.length > 0 ? (
            items.map((item: ICity, index: number) =>
              this.renderCheckBox(item, index)
            )
          ) : (
            <p>No active categories available</p>
          )}
        </div>
      </div>
    )
  }
}
