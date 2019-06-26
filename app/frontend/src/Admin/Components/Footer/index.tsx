import React from 'react'
import './styles.scss'
import Button from 'src/Common/Components/Button' 
import { IProps } from './types';

const Footer: React.SFC<IProps> = ({
  handleOpenModal,
  parentTrip
}) => {
  return (
    <div className="table-footer">
      <Button
      className="spon-table-footer__button"
      variant="blue"
      icon="plus"
      text="ADD NEW"
      onClick={() => handleOpenModal(parentTrip)}
      />
    </div>
  )
}

export default Footer
