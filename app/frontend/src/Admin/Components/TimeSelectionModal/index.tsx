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
        _0to6AM: editSchedule.timeSelection._0to6AM,
        _6to8AM: editSchedule.timeSelection._6to8AM,
        _8to10AM: editSchedule.timeSelection._8to10AM,
        _10to12PM: editSchedule.timeSelection._10to12PM,
        _12to2PM: editSchedule.timeSelection._12to2PM,
        _2to4PM: editSchedule.timeSelection._2to4PM,
        _4to6PM: editSchedule.timeSelection._4to6PM,
        _6to8PM: editSchedule.timeSelection._6to8PM,
        _8to10PM: editSchedule.timeSelection._8to10PM,
        _10to12AM: editSchedule.timeSelection._10to12AM,
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
                  _0to6AM: 0,
                  _6to8AM: 0,
                  _8to10AM: 0,
                  _10to12PM: 0,
                  _12to2PM: 0,
                  _2to4PM: 0,
                  _4to6PM: 0,
                  _6to8PM: 0,
                  _8to10PM: 0,
                  _10to12AM: 0
                },
              }
        }
        validationSchema={Yup.object().shape({
          timeSelection: Yup.object().shape({
            _0to6AM: Yup.number().required(),
            _6to8AM: Yup.number().required(),
            _8to10AM: Yup.number().required(),
            _10to12PM: Yup.number().required(),
            _12to2PM: Yup.number().required(),
            _2to4PM: Yup.number().required(),
            _4to6PM: Yup.number().required(),
            _6to8PM: Yup.number().required(),
            _8to10PM: Yup.number().required(),
            _10to12AM: Yup.number().required()
          })
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
        }: FormikProps<IFormValues>) => (
          <Form noValidate>
            <div className="spon-seltime-modal__row"> {/** spon-timeselection-modal pour tout */}
              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection._0to6AM"
                  label="00:00 AM - 6:00 AM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection._0to6AM"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection._6to8AM"
                  label="6:00 AM - 8:00 AM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection._6to8AM"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection._8to10AM"
                  label="8:00 AM - 10:00 AM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection._8to10AM"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection._10to12PM"
                  label="10:00 AM - 12:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection._10to12PM"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>
            
              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection._12to2PM"
                  label="12:00 PM - 2:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection._12to2PM"
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
                  name="timeSelection._2to4PM"
                  label="2:00 PM - 4:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection._2to4PM"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection._4to6PM"
                  label="4:00 PM - 6:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection._4to6PM"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection._6to8PM"
                  label="6:00 PM - 8:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection._6to8PM"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>
        
              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection._8to10PM"
                  label="8:00 PM - 10:00 PM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection._8to10PM"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>

              <div className="spon-seltime-modal__input-cnt spon-seltime-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection._10to12AM"
                  label="10:00 PM - 00:00 AM"
                  className="spon-seltime-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection._10to12AM"
                  component="div"
                  className="spon-seltime-modal__error"
                />
              </div>
            </div>

            <div className="spon-seltime-modal__row--bordered"/>
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
