import React from 'react'
import Button from '../../../Common/Components/Button'

import { MODAL_TYPE } from '../../Utils/adminTypes'
import { IProps } from './types'
import './styles.scss'

const Header: React.SFC<IProps> = ({
  title,
  query,
  handleSearch,
  handleOpenModal
}) => {
  return (
    <div className="spon-admin-header">
      <div className="spon-admin-header__inner">
        <h1 className="spon-admin-header__heading">{title}</h1>
      </div>

      {handleOpenModal ? (
        <Button
          className="spon-admin-header__add-button"
          variant="blue"
          icon="plus"
          text="ADD NEW"
          onClick={() => handleOpenModal(MODAL_TYPE.ADD_TRIP, 'Create trip')}
        />
      ) : null}
    </div>
  )
}
export default Header
