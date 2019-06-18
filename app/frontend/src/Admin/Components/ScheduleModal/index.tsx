import React from 'react'
import {
  Formik,
  FormikActions,
  Form,
  Field,
  FormikProps,
  ErrorMessage
} from 'formik'
import moment from 'moment'
import * as Yup from 'yup'


import Input from '../Input'
import Dropdown from '../Dropdown'
import DatePicker from '../DatePicker'
import Switch from '../Switch'
import Button from '../../../Common/Components/Button'
import { IProps, IState, IFormValues } from './types'
import './styles.scss'

class ScheduleModal extends React.Component<IProps, IState> {
  readonly state: IState = {
    isRecurring: false
  }

  render() {
    const {
      editDate,
      tripSelected,
      handleEditTicket,
      destinations,
      handleSubmit,
      closeModal,
      isLoading
    } = this.props

    return (
      <div className="spon-ticket-modal">
        <Formik
          enableReinitialize
          initialValues={
            editDate
              ? {
                  ...editDate,
                  date: new Date(editDate!.date.start),
                  hours: `${moment
                    .utc(editDate!.date.start)
                    .format('h')}-${moment
                    .utc(editDate!.date.end)
                    .format('h')}`,
                  direction: `${editDate.direction[0].toUpperCase()}${editDate.direction.substr(
                    1
                  )}`
                }
              : {
                  trip: {
                    _id: tripSelected ? tripSelected._id : '',
                    departure: tripSelected ? tripSelected.departure : '',
                    destination: tripSelected ? tripSelected.destination : ''
                  },
                  type: 'Train',
                  quantity: 0,
                  date: undefined,
                  endDate: undefined,
                  days: [0, 1, 2, 3, 4, 5, 6],
                  hours: '',
                  active: true,
                  direction: 'Arrival'
                }
          }
          validationSchema={Yup.object().shape({
            trip: Yup.object().shape({
              _id: Yup.string(),
              name: Yup.string().required('Trip is required')
            }),
            type: Yup.string().required('Trip type is required'),
            quantity: Yup.number()
              .min(1)
              .max(1000)
              .required(),
            date: Yup.string().required(),
            hours: Yup.string().required(),
            direction: Yup.string().required(),
            isRecurring: Yup.boolean(),
            endDate: Yup.string().when('isRecurring', {
              is: true,
              then: Yup.string().required('End date is required')
            }),
            days: Yup.array().when('isRecurring', {
              is: true,
              then: Yup.array().min(1)
            })
          })}
          onSubmit={(
            values: IFormValues,
            { resetForm }: FormikActions<IFormValues>
          ) => {
            const splitedHours = values.hours!.split('-')
            const startHours = splitedHours[0]
            const endHour = splitedHours[1]
            const offset = moment().utcOffset()

            const dataToSubmit = {
              trip: values.trip._id,
              direction: values.direction.toLocaleLowerCase(),
              quantity: values.quantity,
              type: values.type,
              hours: values.hours,
              date: {
                start: +moment
                  .utc(values.date)
                  .add(offset, 'minutes')
                  .set({
                    hour: +startHours,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                  })
                  .format('x'),
                end: +moment
                  .utc(values.date)
                  .add(offset, 'minutes')
                  .set({
                    hour: +endHour,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                  })
                  .format('x')
              },
              active: values.active,
              repeat: {
                dateEnd: +moment
                  .utc(values.endDate)
                  .add(offset, 'minutes')
                  .format('x'),
                days: values.days as number[]
              }
            }

            if (editDate || !values.isRecurring) {
              delete dataToSubmit.repeat
            }

            if (editDate && handleEditTicket) {
              handleEditTicket(dataToSubmit).then(() => {
                resetForm()
                closeModal()
              })
            } else if (handleSubmit) {
              handleSubmit(dataToSubmit).then(() => {
                resetForm()
                closeModal()
              })
            }
          }}
          render={({
            handleChange,
            values,
            setFieldValue
          }: FormikProps<IFormValues>) => (
            <Form noValidate>
              <div className="spon-ticket-modal__row">
                <div className="spon-ticket-modal__input-cnt spon-ticket-modal__input-cnt--big">
                  <Dropdown
                    saveAsObject
                    id="trip"
                    label="Select the trip"
                    placeholder="Select trip"
                    className="spon-ticket-modal__dropdown"
                    selectedValue={values.trip ? values.trip.destination : ''}
                    options={destinations}
                    onChange={handleChange}
                  />

                  <ErrorMessage
                    name="trip.destination"
                    component="div"
                    className="spon-ticket-modal__error"
                  />
                </div>
                <div className="spon-ticket-modal__input-cnt">
                  <Dropdown
                    id="type"
                    label="Select the trip"
                    placeholder="Best trip"
                    className="spon-ticket-modal__dropdown"
                    selectedValue={values.type ? values.type : ''}
                    options={[
                      {
                        _id: '1',
                        name: 'Train'
                      },
                      {
                        _id: '1',
                        name: 'Bus'
                      }
                    ]}
                    onChange={handleChange}
                  />

                  <ErrorMessage
                    name="type"
                    component="div"
                    className="spon-ticket-modal__error"
                  />
                </div>
                <div className="spon-ticket-modal__input-cnt spon-ticket-modal__input-cnt--small">
                  <Field
                    type="number"
                    name="quantity"
                    label="Quantity"
                    className="spon-ticket-modal__input"
                    component={Input}
                  />

                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="spon-ticket-modal__error"
                  />
                </div>
              </div>

              <div className="spon-ticket-modal__row">
                <div className="spon-ticket-modal__input-cnt">
                  <DatePicker
                    id="date.start"
                    label="Start date"
                    placeholder="Select date"
                    selectedDate={editDate ? (values.date as Date) : undefined}
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
                    selectedDate={editDate ? (values.date as Date) : undefined}
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

                <div className="spon-ticket-modal__toggles">
                  <div className="spon-ticket-modal__toggle-item">
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

              <div className="spon-ticket-modal__row">
                <div className="spon-ticket-modal__buttons">
                  <Button
                    text="CANCEL"
                    variant="adminSecondary"
                    onClick={closeModal}
                    className="spon-ticket-modal__button"
                  />
                  <Button
                    text={editDate ? 'EDIT' : 'ADD'}
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                    variant="adminPrimary"
                    className="spon-ticket-modal__button"
                  />
                </div>
              </div>
            </Form>
          )}
        />
      </div>
    )
  }
}

export default ScheduleModal
