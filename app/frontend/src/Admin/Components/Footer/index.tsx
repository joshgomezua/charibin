import React from 'react'
import './styles.scss'
import Button from 'src/Common/Components/Button' 

const Footer: React.SFC<{}> = () => {

  return (
    <div className="table-footer">
      <Button
      className="spon-table-footer__button"
      variant="blue"
      icon="plus"
      text="ADD NEW"
      // onClick={() => openScheduleModal(MODAL_TYPE.ADD_TRIP, 'Create schedule')}
      />
    </div>
  )
}

export default Footer
