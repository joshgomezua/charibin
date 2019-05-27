import React from 'react'
import Button from '../../../Common/Components/Button'
import { IProps } from './types'
import './styles.scss'

const DeleteModal: React.SFC<IProps> = ({ closeModal, deleteItem }) => (
  <div className="spon-delete-modal">
    <p className="spon-delete-modal__heading">Are you sure?</p>
    <div className="spon-delete-modal__text">
      You’ve read about the importance of being courageous, rebellious and
      imaginative. These are all vital ingredients in an effective advertising
      campaign.
    </div>
    <div className="spon-delete-modal__buttons">
      <Button text="Cancel" variant="adminSecondary" onClick={closeModal} />
      <Button text="Delete" variant="adminPrimary" onClick={deleteItem} />
    </div>
  </div>
)

export default DeleteModal
