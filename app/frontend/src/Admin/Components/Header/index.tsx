import React from 'react'
import Button from '../../../Common/Components/Button'

import { MODAL_TYPE } from '../../Utils/adminTypes'
import { IProps } from './types'
import './styles.scss'
import Switch from '../Switch';

const Header: React.SFC<IProps> = ({
  title,
  query,
  heading,
  modal,
  handleSearch,
  handleToggle,
  enable,
  handleOpenModal
}) => {
  return (
    <div className="spon-admin-header">
      <div className="spon-admin-header__inner">
        {title? <h1 className="spon-admin-header__heading">{title}</h1> : null
        }
      </div>

      {handleSearch ? (
        <input type="text"
          onChange={handleSearch}
          value={query}
          placeholder="search here"
          className="spon-admin-header__search"
        />
      ): null}

     <div>  
      {handleToggle ? (  
        <Switch
          checked={enable ? enable : false}
          onChange={() => { handleToggle() }}
        />) : null} 
    </div>

      {(handleOpenModal && heading && modal) ? (
        <Button
          className="spon-admin-header__add-button"
          variant="blue"
          icon="plus"
          text="ADD NEW"
          onClick={() => handleOpenModal(modal, heading)}
        />
      ) : handleOpenModal ? (
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
