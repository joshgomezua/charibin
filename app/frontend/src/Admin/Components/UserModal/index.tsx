import React from 'react'
import {
  Formik,
  FormikActions,
  Form,
  Field,
  FormikProps,
  ErrorMessage
} from 'formik'

import * as Yup from 'yup'
import Input from '../Input'
import Dropdown from '../Dropdown'
import Button from '../../../Common/Components/Button'
import { IProps, IFormValues, IEditValues } from './types'
import './styles.scss'

const UserModal: React.SFC<IProps> = ({
  isLoading,
  editDate,
  closeModal,
  handleEditUser,
  handleSubmit
}) => {
  let editableData = null

  if (editDate) {
    editableData = {
      name: editDate.name,
      email: editDate.email,
      role: editDate.role,
      active: editDate.active,
    }
  }

  return (
    <div className="spon-trip-modal"> 
      <Formik
        enableReinitialize
        initialValues={
          editableData
            ? editableData
            : {
                name: '',
                email: '',
                role: '',
                active: true,
                isDeleted: false
                
              }
        }
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(3)
            .required(),
          email: Yup.string().label('Email').email().required(' Email field is required! '),
          role: Yup.string().required()
          
        })}
        onSubmit={(
          values: IFormValues,
          { resetForm }: FormikActions<IFormValues>
        ) => {
          const dataToUpdate: IEditValues = {}
          if (editDate) {
            for (const key in values) {
              if (
                values.hasOwnProperty(key) &&
                values[key] !== editDate![key]
              ) {
                dataToUpdate[key] = values[key]
              }
            }
          }

          if (editDate && handleEditUser) {
            handleEditUser(dataToUpdate).then(() => resetForm())
          } else if (handleSubmit) {
            handleSubmit(values).then(() => resetForm())
          }
        }}
        render={({
          handleChange,
          values,
 
        }: FormikProps<IFormValues>) => (
          <Form noValidate>
            <div className="spon-trip-modal__row"> 
              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt--big">
                <Field
                  type="text"
                  placeholder="Type name"
                  name="name"
                  label="Name of user"
                  className="spon-trip-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="name"
                  component="div"
                  className="spon-trip-modal__error"
                />
              
              </div>
              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt--big">
                <Field
                  type="email"
		              placeholder="Type email"
                  name="email"
                  label="E-mail"
                  className="spon-trip-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="spon-trip-modal__error"
                />
            
              </div>
            </div>
            <div className="spon-trip-modal__row"> 
              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt--big">
                <Dropdown
                  id="role"
                  label="Select the role"
                  placeholder="Select role"
                  className="spon-trip-modal__input"
                  selectedValue={values.role ? values.role : ''}
                  options={[
                      {
                          _id: '0',
                          name: 'Administrator'
                      },
                      {
                        _id: '1',
                        name: 'Modify'
                    },
                    {
                        _id: '2',
                        name: 'Read Only'
                    }
                    ]}
                  onChange={handleChange}
                />

                <ErrorMessage
                  name="role"
                  component="div"
                  className="spon-trip-modal__error"
                />
              </div>
            </div>

            <div className="spon-seltime-modal__row--bordered"/>
             
            <div className="spon-trip-modal__row">
              <div className="spon-trip-modal__buttons">
                <Button
                  text="CANCEL"
                  variant="adminSecondary"
                  onClick={closeModal}
                  className="spon-trip-modal__button"
                />
                <Button
                  text={editDate ? 'UPDATE' : 'ADD'}
                  disabled={isLoading}
                  isLoading={isLoading}
                  type="submit"
                  variant="adminPrimary"
                  className="spon-trip-modal__button"
                />
              </div>
            </div>
          </Form>
        )}
      />
    </div>
  )
}

export default UserModal
