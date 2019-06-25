import React from 'react'
import {
  Formik,
  FormikActions,
  Form,
  Field,
  FormikProps,
  ErrorMessage
} from 'formik'
//import FileInput from '../../Components/FileInput' // à enlever si inutile
import * as Yup from 'yup'

import Input from '../Input'
import Dropdown from '../Dropdown'
//import Switch from '../Switch' // à enlever si inutile
import Button from '../../../Common/Components/Button'
//import photoSvg from '../../../Common/Utils/Media/photo.svg' // à enlever si inutile

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
    <div className="spon-trip-modal"> {/** changer le nom pour user-modal - pas trop prioritaire en vrai */}
      <Formik
        enableReinitialize
        initialValues={
          editableData
            ? editableData
            : {
                name: '',
                email: '',
                role: '',
                active: true
                
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
          errors, // à enlever si inutile
          touched, // à enlever si inutile
          setFieldError // à enlever si inutile
        }: FormikProps<IFormValues>) => (
          <Form noValidate>
            <div className="spon-trip-modal__row"> {/** changere le nom pour user et dans le scss aussi pour le coup pas trop prioritaire */}
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
              

              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt--big">
                <Field
                  type="email"
		  placeholder="Type email" // indentation
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
            

              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt--big spon-trip-modal__input-cnt--last">
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
                        name: 'Client'
                    },
                    {
                        _id: '2',
                        name: 'Guest'
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

            </div></div> {/** à enlever */}
              
             
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
