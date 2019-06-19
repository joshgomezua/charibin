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
// import Switch from '../Switch' -> enlever
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
      timeSelection: {
        defaultPrice: editSchedule.timeSelection.defaultPrice,
        time1: editSchedule.timeSelection.time1,
        time2: editSchedule.timeSelection.time2,
        time3: editSchedule.timeSelection.time3,
        time4: editSchedule.timeSelection.time4,
        time5: editSchedule.timeSelection.time5,
        time6: editSchedule.timeSelection.time6,
        time7: editSchedule.timeSelection.time7,
        time8: editSchedule.timeSelection.time8,
        time9: editSchedule.timeSelection.time9,
        time10: editSchedule.timeSelection.time10,
      }
      // bidirectionalChange: false -> enlever
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
                timeSelection:{
                  defaultPrice: 1,
                  time1: 0,
                  time2: 0,
                  time3: 0,
                  time4: 0,
                  time5: 0,
                  time6: 0,
                  time7: 0,
                  time8: 0,
                  time9: 0,
                  time10: 0
                },
                // bidirectionalChange: false,
              }
        }
        validationSchema={Yup.object().shape({
          timeSelection: Yup.object().shape({
            time1: Yup.number().required(),
            time2: Yup.number().required(),
            time3: Yup.number().required(),
            time4: Yup.number().required(),
            time5: Yup.number().required(),
            time6: Yup.number().required(),
            time7: Yup.number().required(),
            time8: Yup.number().required(),
            time9: Yup.number().required(),
            time10: Yup.number().required()
          })
          // bidirectionalChange: Yup.bool().required(), -> enlever
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
          handleChange, // -> enlever
          values,
          errors, // -> enlever
          touched, // -> enlever
          setFieldError // -> enlever
        }: FormikProps<IFormValues>) => (
          <Form noValidate>
            <div className="spon-seltime-modal__row"> {/** spon-timeselection-modal pour tout */}
              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection.time1"
                  label="00:00 AM - 6:00 AM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection.time1"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection.time2"
                  label="6:00 AM - 8:00 AM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection.time2"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection.time3"
                  label="8:00 AM - 10:00 AM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection.time3"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection.time4"
                  label="10:00 AM - 12:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection.time4"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>
            
              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection.time5"
                  value={values.timeSelection.defaultPrice}
                  label="12:00 PM - 2:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection.time5"
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
                  name="timeSelection.time6"
                  label="2:00 PM - 4:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection.time6"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection.time7"
                  label="4:00 PM - 6:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection.time7"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection.time8"
                  label="6:00 PM - 8:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection.time8"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>
        
              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection.time9"
                  label="8:00 PM - 10:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection.time9"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection.time10"
                  label="10:00 PM - 00:00 AM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection.time10"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>
            </div>

            {/* <div className="spon-seltime-modal__row">
              <div className="spon-seltime-modal__toggles">
                <div className="spon-seltime-modal__toggle-item">
                  <p>Bidirectional Change:</p>
                  <Switch
                    checked=false,
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
            </div> */} {/* probablement commenté de la part des devs de redvike? */}
            

            <div className="spon-seltime-modal__row--bordered"></div>
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
