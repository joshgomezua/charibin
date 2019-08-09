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
import DatePicker from '../DatePicker'

import { IProps, IFormValues } from './types'
import './styles.scss'

const ScheduleModal: React.SFC<IProps> = ({
  isLoading,
  editDate,
  closeModal,
  handleEditSchedule,
  handleSubmit
}) => {
  let editableData = null

  if (editDate) {

    editableData = {
      adultPrice: editDate.adultPrice,
      childPrice: editDate.childPrice,
      discount: editDate.discount,
      duration: editDate.duration,
      deselectionPrice: editDate.deselectionPrice,
      timeSelection: {
        defaultPrice: editDate.timeSelection.defaultPrice,
      },
      date: {
        start: undefined,
        end: undefined
      },
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
                adultPrice: 0,
                childPrice: 0,
                discount: 0,
                duration: 0,
                deselectionPrice: 0,
                timeSelection: {
                  defaultPrice: 0,
                },
                date: {
                  start: undefined,
                  end: undefined
                },
                active: false,
              }
        }
        validationSchema={Yup.object().shape({
          adultPrice: Yup.number()
            .required()
            .min(1),
          childPrice: Yup.number()
            .required()
            .min(1),
          discount: Yup.number()
            .required()
            .min(1),
          duration: Yup.number()
            .min(1)
            .max(100000)
            .required(),
          timeSelection: Yup.object().shape({
            defaultPrice: Yup.number()
              .required()
              .min(1),
          }),
          date: Yup.object().shape({
            start: Yup.string()
              .required(),
            end: Yup.string()
              .required()
          }),
          deselectionPrice: Yup.number()
            .required()
            .min(1),
          active: Yup.bool().required()
        })}
        onSubmit={(
          values: IFormValues,
          { resetForm }: FormikActions<IFormValues>
        ) => {
          const dataToUpdate = {
            adultPrice: values.adultPrice,
            childPrice: values.childPrice,
            discount: values.discount,
            timeSelection: {
              defaultPrice: values.timeSelection.defaultPrice,
            },
            deselectionPrice: values.deselectionPrice,
            duration: values.duration,
            date: {
              start: values.date.start,
              end: values.date.end
            },
            active: values.active,
          }

          if (editDate && handleEditSchedule) {
            handleEditSchedule(dataToUpdate).then(() => resetForm())
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
              <div className="spon-ticket-modal__input-cnt">
                <DatePicker
                  id="date.start"
                  label="Start date"
                  placeholder="Select date"
                  isInTicketModal={true}
                  selectedDate={editDate ? (values.date.start as Date) : undefined}
                  onChange={(date: Date) => {
                    handleChange({
                      target: {
                        id: 'date.start',
                        value: date
                      }
                    })
                  }}
                />

                <ErrorMessage
                  name="date.start"
                  component="div"
                  className="spon-ticket-modal__error"
                />
              </div>
              <div className="spon-ticket-modal__input-cnt">
                <DatePicker
                  id="date.end"
                  label="End date"
                  placeholder="Select date"
                  selectedDate={values.date.end ? (values.date.end as Date) : (values.date.start as Date)}
                  onChange={(date: Date) => {
                    handleChange({
                      target: {
                        id: 'date.end',
                        value: date
                      }
                    })
                  }}
                />

                <ErrorMessage
                  name="date.end"
                  component="div"
                  className="spon-ticket-modal__error"
                />
              </div>
              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt">
                <Field
                  isPrefix
                  type="number"
                  name="adultPrice"
                  label="Set Adult Price"
                  className="spon-trip-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="adultPrice"
                  component="div"
                  className="spon-trip-modal__error"
                />
              </div>
            </div>
            <div className="spon-trip-modal__row">
              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt">
                <Field
                  isPrefix
                  type="number"
                  name="childPrice"
                  label="Set Child Price"
                  className="spon-trip-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="childPrice"
                  component="div"
                  className="spon-trip-modal__error"
                />
              </div>
              <div className="spon-trip-modal__input-cnt">
                <Field
                  isPrefix
                  type="number"
                  name="deselectionPrice"
                  label="Deselection Price"
                  className="spon-trip-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="deselectionPrice"
                  component="div"
                  className="spon-trip-modal__error"
                />
              </div>
              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt">
                <Field
                  isPrefix
                  type="number"
                  name="timeSelection.defaultPrice"
                  label="Time Selection"
                  className="spon-trip-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="timeSelection.defaultPrice"
                  component="div"
                  className="spon-trip-modal__error"
                />
              </div>
            </div>

            <div className="spon-trip-modal__row  spon-trip-modal__row--bordered">
              <div className="spon-trip-modal__input-cnt">
                <Field
                  isSuffix
                  type="number"
                  name="discount"
                  label="Discount"
                  className="spon-trip-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="discount"
                  component="div"
                  className="spon-trip-modal__error"
                />
              </div>

              <div className="spon-trip-modal__input-cnt">
                <Field
                  type="number"
                  name="duration"
                  label="Duration (minutes)"
                  className="spon-trip-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="duration"
                  component="div"
                  className="spon-trip-modal__error"
                />
              </div>

              <div className="spon-trip-modal__toggles">
                <div className="spon-trip-modal__toggle-item">
                  <p>Active:</p>
                  <Switch
                    checked={values.active}
                    onChange={() =>
                      handleChange({
                        target: {
                          id: 'active',
                          value: !values.active
                        }
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="spon-trip-modal__row">
              <div className="spon-trip-modal__buttons">
                <Button
                  text="CANCEL"
                  variant="adminSecondary"
                  onClick={closeModal}
                  className="spon-trip-modal__button"
                />
                <Button
                  text={editDate ? 'EDIT' : 'ADD'}
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

export default ScheduleModal
