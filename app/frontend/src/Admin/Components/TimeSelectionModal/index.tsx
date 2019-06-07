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
import Switch from '../Switch'
import Button from '../../../Common/Components/Button'

import { IProps, IFormValues, IEditValues } from './types'
import './styles.scss'

const TimeSelectionModal: React.SFC<IProps> = ({
  isLoading,
  editSchedule,
  closeModal,
  handleEditTimeSelection,
  handleSubmit
}) => {
  let editableData = null

  if (editSchedule) {
    editableData = {
      defaultPrice: editSchedule.defaultPrice,
      time1: editSchedule.time1,
      time2: editSchedule.time2,
      time3: editSchedule.time3,
      time4: editSchedule.time4,
      time5: editSchedule.time5,
      time6: editSchedule.time6,
      time7: editSchedule.time7,
      time8: editSchedule.time8,
      time9: editSchedule.time9,
      time10: editSchedule.time10,
      bidirectionalChange: editSchedule.bidirectionalChange
    }
  }

  return (
    <div className="spon-seltime-modal">
      <Formik
        enableReinitialize
        initialValues={
          editableData
            ? editableData
            : {
                defaultPrice: 4,
                time1: 0,
                time2: 0,
                time3: 0,
                time4: 0,
                time5: 0,
                time6: 0,
                time7: 0,
                time8: 0,
                time9: 0,
                time10: 0,
                bidirectionalChange: false
              }
        }
        validationSchema={Yup.object().shape({
          time1: Yup.number().required(),
          time2: Yup.number().required(),
          time3: Yup.number().required(),
          time4: Yup.number().required(),
          time5: Yup.number().required(),
          time6: Yup.number().required(),
          time7: Yup.number().required(),
          time8: Yup.number().required(),
          time9: Yup.number().required(),
          time10: Yup.number().required(),
          bidirectionalChange: Yup.bool().required(),
        })}
        onSubmit={(
          values: IFormValues,
          { resetForm }: FormikActions<IFormValues>
        ) => {
          const dataToUpdate: IEditValues = {}
          if (editSchedule) {
            for (const key in values) {
              if (
                values.hasOwnProperty(key) &&
                values[key] !== editSchedule![key]
              ) {
                dataToUpdate[key] = values[key]
              }
            }
          }

          if (editSchedule && handleEditTimeSelection) {
            handleEditTimeSelection(dataToUpdate).then(() => resetForm())
          } else if (handleSubmit) {
            handleSubmit(values).then(() => resetForm())
          }
        }}
        render={({
          handleChange,
          values,
          errors,
          touched,
          setFieldError
        }: FormikProps<IFormValues>) => (
          <Form noValidate>
            <div className="spon-seltime-modal__row">
              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  value= {values.defaultPrice}
                  name="time1"
                  label="00:00 AM - 6:00 AM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="time1"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="time2"
                  label="6:00 AM - 8:00 AM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="time2"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="time3"
                  label="8:00 AM - 10:00 AM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="time3"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="time4"
                  label="10:00 AM - 12:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="time4"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>
            
              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="time5"
                  value={values.defaultPrice}
                  label="12:00 PM - 2:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="time5"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>
            </div>

            <div className="spon-seltime-modal__row">
              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="time6"
                  label="2:00 PM - 4:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="time6"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="time7"
                  label="4:00 PM - 6:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="time7"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="time8"
                  label="6:00 PM - 8:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="time8"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>
        
              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="time9"
                  label="8:00 PM - 10:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="time9"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="time10"
                  label="10:00 PM - 00:00 AM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="time10"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>
            </div>

            <div className="spon-seltime-modal__row">
              <div className="spon-seltime-modal__toggles">
                <div className="spon-seltime-modal__toggle-item">
                  <p>Bidirectional Change:</p>
                  <Switch
                    checked={values.bidirectionalChange}
                    onChange={() =>
                      handleChange({
                        target: {
                          id: 'bidirectionalChange',
                          value: !values.bidirectionalChange
                        }
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="spon-seltime-modal__row">
              <div className="spon-seltime-modal__buttons">
                <Button
                  text="CANCEL"
                  variant="adminSecondary"
                  onClick={closeModal}
                  className="spon-seltime-modal__button"
                />
                <Button
                  text={editSchedule ? 'EDIT' : 'ADD'}
                  disabled={isLoading}
                  isLoading={isLoading}
                  type="submit"
                  variant="adminPrimary"
                  className="spon-seltime-modal__button"
                />
              </div>
            </div>
          </Form>
        )}
      />
    </div>
  )
}

export default TimeSelectionModal
