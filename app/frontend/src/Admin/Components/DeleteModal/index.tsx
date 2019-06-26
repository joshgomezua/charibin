import React from 'react'
import Button from '../../../Common/Components/Button'
import { IProps } from './types'
import './styles.scss'

const DeleteModal: React.SFC<IProps> = ({ closeModal, deleteItem }) => (
  <div className="spon-delete-modal">
    <p className="spon-delete-modal__heading">Are you sure?</p>
    <div className="spon-delete-modal__text">
      The user will be deleted.
    </div>
    <div className="spon-delete-modal__buttons">
      <Button text="Cancel" variant="adminSecondary" onClick={closeModal} />
      <Button text="Delete" variant="adminPrimary" onClick={deleteItem} />
    </div>
  </div>
)

export default DeleteModal
