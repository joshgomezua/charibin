import React from 'react'

import Button from '../../../Common/Components/Button'

import { STEP_IDS } from '../../Utils/constants'
import { ISelectedData } from '../../Utils/appTypes'
import { IProps } from './types'
import './styles.scss'

const SelectPanel: React.SFC<IProps> = ({
  step,
  selected,
  deselected,
  isMax,
  max,
  onNext,
  onBack
}) => {
  const totalDeselectionConst = deselected
    ? deselected.reduce(
        (total: number, deselected: ISelectedData) =>
          total + deselected.deselectionPrice,
        0
      )
    : 0
  const isSelect = step === STEP_IDS.SELECT
  const isDeselect = step === STEP_IDS.DESELECT

  return (
    <section className={`selectpanel ${isSelect ? 'selectpanel--select' : ''}`}>
      <div className="selectpanel-images">
        {selected.map((item: ISelectedData, index: number) => {
          const isSome = deselected
            ? deselected.some(
                (deselected: ISelectedData) => deselected.tripId === item.tripId
              )
            : false

          return !isSome ? (
            <div key={index} className="selectpanel-images-img">
              <img src={item.photo} alt="image" />
            </div>
          ) : null
        })}

        {isSelect && (
          <span>{`${selected.length}/${max} destinations selected`}</span>
        )}
        {isDeselect && (
          <div className="selectpanel-images-text">
            <span>{`${selected.length - deselected!.length}/${
              selected.length
            } destinations selected`}</span>
            {deselected!.length > 0 && (
              <span className="selectpanel-images-text-red">{`+ £${totalDeselectionConst} for deselection`}</span>
            )}
          </div>
        )}
      </div>
      <div className={'selectpanel-buttons'}>
        {isSelect && (
          <Button
            className="selectpanel-buttons-btn"
            disabled={!isMax}
            icon="arrowRight"
            text="next step"
            variant="next"
            onClick={onNext}
          />
        )}
        {isDeselect && (
          <>
            <Button
              className="selectpanel-buttons-btn selectpanel-buttons-btn--prev"
              icon="arrowLeft"
              text="previous step"
              variant="prev"
              onClick={onBack}
            />
            <Button
              className="selectpanel-buttons-btn"
              icon="arrowRight"
              text="next step"
              variant="next"
              onClick={onNext}
            />
          </>
        )}
      </div>
    </section>
  )
}

export default SelectPanel
