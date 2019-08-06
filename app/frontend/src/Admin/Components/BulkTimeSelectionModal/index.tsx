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

import { IProps, IFormValues } from './types'
import './styles.scss'

const BulkTimeSelectionModal: React.SFC<IProps> = ({
  isLoading,
  closeModal,
  handleSubmit
}) => {
  let editableData = null
  return (
    <div className="spon-seltime-modal">
      <Formik
        enableReinitialize
        initialValues={
          editableData
            ? editableData
            : {
                timeSelection:{
                  defaultPrice: 0,
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
                }
              }
        }
        validationSchema={Yup.object().shape({
          timeSelection: Yup.object().shape({
            _0to6AM: Yup.number().min(0),
            _6to8AM: Yup.number().min(0),
            _8to10AM: Yup.number().min(0),
            _10to12PM: Yup.number().min(0),
            _12to2PM: Yup.number().min(0),
            _2to4PM: Yup.number().min(0),
            _4to6PM: Yup.number().min(0),
            _6to8PM: Yup.number().min(0),
            _8to10PM: Yup.number().min(0),
            _10to12AM: Yup.number().min(0)
          })
        })}
        onSubmit={(
          values: IFormValues,
          { resetForm }: FormikActions<IFormValues>
        ) => {
          if (handleSubmit) {
            handleSubmit(values).then(() => resetForm())
          }
        }}
        render={({
          handleChange,
          values
        }: FormikProps<IFormValues>) => (
          <Form noValidate>
            <div className="spon-seltime-modal__row">
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
                  text={'EDIT'}
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

export default BulkTimeSelectionModal
