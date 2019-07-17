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
import classnames from 'classnames'

import Input from '../Input'
import Dropdown from '../Dropdown'
import DatePicker from '../DatePicker'
import Switch from '../Switch'
import Button from '../../../Common/Components/Button'
import MultiSwitch from '../../Components/MultiSwitch'
import arrowDown from '../../../Common/Utils/Media/arrowDown.svg'

import { daysOfWeek, departureHours } from './_data'
import { IProps, IState, IFormValues } from './types'
import './styles.scss'
import DropDownTicket from '../DropdownTicket';

class TicketModal extends React.Component<IProps, IState> {
  readonly state: IState = {
    isRecurring: false
  }

  handleToggleIsRecurring = () => {
    this.setState((state: IState) => ({ isRecurring: !state.isRecurring }))
  }

  render() {
    const {
      editDate,
      tripSelected,
      handleEditTicket,
      destinations,
      handleSubmit,
      closeModal,
      isLoading,
      departures
    } = this.props
    const isRecurringClass = classnames('spon-ticket-modal__recurring', {
      'spon-ticket-modal__recurring--open': this.state.isRecurring
    })

    const isRecurringLabel = classnames(
      'spon-ticket-modal__label spon-ticket-modal__label--dashed',
      {
        'spon-ticket-modal__label--open': this.state.isRecurring
      }
    )

    return (
      <div className="spon-ticket-modal">
        <Formik
          enableReinitialize
          initialValues={
            editDate
              ? {
                  ...editDate,
                  date: new Date(new Date(editDate!.date.start).getTime()+(new Date(editDate!.date.start).getTimezoneOffset() * 60000)),
                  departureHours: [`${moment
                    .utc(editDate!.date.start)
                    .format('H')}-${moment
                    .utc(editDate!.date.end)
                    .format('H')}`,]
                }
              : {
                  trip: {
                    _id: tripSelected ? tripSelected._id : '',
                    departure: tripSelected ? tripSelected.departure : '',
                    destination: tripSelected ? tripSelected.destination : '',
                  },
                  type: 'Train',
                  quantity: 0,
                  soldTickets: 0,
                  reservedQuantity: 0,
                  departure: '',
                  destination: '',
                  date: undefined,
                  endDate: undefined,
                  days: [0, 1, 2, 3, 4, 5, 6],
                  departureHours: [],
                  active: true,
                }
          }
          
          validationSchema={Yup.object().shape({
            trip: Yup.object().shape({
              _id: Yup.string(),
              departure: Yup.string().required('Trip departure is required'),
              destination: Yup.string().required('Trip destination is required')
            }),
            type: Yup.string().required('Trip type is required'),
            quantity: Yup.number()
              .min(1)
              .max(1000),
            soldTickets: Yup.number()
              .min(0)
              .max(1000),
            reservedQuantity: Yup.number()
              .min(0)
              .max(1000),
            date: Yup.string().required(),
            departureHours: Yup.array().required('At least one option is required'),
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
            const offset = moment().utcOffset()
            const tempDepartureHours: any[] = []

            for (let hours of values.departureHours ? values.departureHours : []) {

              const splitedHours = hours!.split('-')
              const startHours = splitedHours[0]
              const endHour = splitedHours[1]
              const startDate = +moment
              .utc(values.date)
              .add(offset, 'minutes')
              .set({
                hour: +startHours,
                minute: 0,
                second: 0,
                millisecond: 0
              })
              .format('x')

             const endDate = +moment
             .utc(values.date)
             .add(offset, 'minutes')
             .set({
               hour: +endHour,
               minute: 0,
               second: 0,
               millisecond: 0
             })
             .format('x')

             const date = {
               start: startDate,
               end: endDate
             }

             tempDepartureHours.push(date)
            }

            const dataToSubmit = {
              trip: values.trip._id,
              departure: values.trip.departure,
              destination: values.trip.destination,
              quantity: values.quantity,
              soldTickets: values.soldTickets,
              reservedQuantity: values.reservedQuantity,
              type: values.type,
              date: {
                start: +tempDepartureHours[0].start,
                end: +tempDepartureHours[0].end
              },
              active: values.active,
              repeat: {
                dateEnd: +moment
                  .utc(values.endDate)
                  .add(offset, 'minutes')
                  .format('x'),
                days: values.days as number[]
              },
              departureHours: tempDepartureHours
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
                
                  <DropDownTicket
                    saveAsObject
                    id="trip"
                    label="From"
                    placeholder="From"
                    className="spon-ticket-modal__dropdown"
                    selectedValue={values.trip ? values.trip.departure : ''}
                    options={departures}
                    onChange={handleChange}
                    onSelectDeparture={this.props.handleSelectDeparture}
                  />

                  <ErrorMessage
                    name="trip.departure"
                    component="div"
                    className="spon-ticket-modal__error"
                  />
                  
                </div>
                <div className="spon-ticket-modal__input-cnt spon-ticket-modal__input-cnt--big">           
                  <DropDownTicket
                    saveAsObject
                    id="trip"
                    label="To"
                    placeholder="To"
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
                    label="Select type"
                    placeholder="Select type"
                    className="spon-ticket-modal__dropdown"
                    selectedValue={values.type ? values.type : ''}
                    options={[
                      {
                        _id: '0',
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
                    id="date"
                    label="Start date"
                    placeholder="Select date"
                    isInTicketModal={true}
                    selectedDate={editDate ? (values.date as Date) : undefined}
                    onChange={(date: Date) => {
                      handleChange({
                        target: {
                          id: 'date',
                          value: date
                        }
                      })
                    }}
                  />

                  <ErrorMessage
                    name="date"
                    component="div"
                    className="spon-ticket-modal__error"
                  />
                </div>
                
              <div className="spon-ticket-modal__input-cnt--really-big">
                <p className="spon-ticket-modal__label spon-ticket-modal__label--nmt">
                  Hours of Day
                </p>
                <MultiSwitch
                  isMulti
                  className="spon-ticket-modal__days-of-week"
                  onChange={(name: string, id: string) => {
                    if (values.departureHours!.includes(name)) {
                      const hoursFiltered = values.departureHours!.filter(
                        (departuresHours: string) => departuresHours !== name
                      )
                      handleChange({
                        target: { value: hoursFiltered, name: 'departureHours' }
                      })
                    } else {
                      handleChange({
                        target: {
                          value: [...values.departureHours!, name],
                          name: 'departureHours'
                        }
                      })
                    }
                  }}
                  selectedValues={values.departureHours!}
                  items={departureHours}
                />
                <ErrorMessage
                    name="departureHours"
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

              {!editDate ? (
                <div className="spon-ticket-modal__row spon-ticket-modal__row--wrap">
                  <div
                    className={isRecurringLabel}
                    onClick={() => {
                      this.handleToggleIsRecurring()
                      setFieldValue('isRecurring', !values.isRecurring)
                    }}>
                    <div>
                      Recurring Settings
                      <img src={arrowDown} alt="" />
                    </div>
                  </div>

                  <div className={isRecurringClass}>
                    {values.isRecurring ? (
                      <>
                        <div className="spon-ticket-modal__input-cnt">
                          <DatePicker
                            id="endDate"
                            label="End date"
                            selectedDate={values.date as Date}
                            placeholder="Select date"
                            onChange={(date: Date) => {
                              handleChange({
                                target: {
                                  id: 'endDate',
                                  value: date
                                }
                              })
                            }}
                          />

                          <ErrorMessage
                            name="endDate"
                            component="div"
                            className="spon-ticket-modal__error"
                          />
                        </div>

                        <div className="spon-ticket-modal__input-cnt spon-ticket-modal__input-cnt--big">
                          <p className="spon-ticket-modal__label spon-ticket-modal__label--nmt">
                            Days of week
                          </p>
                          <MultiSwitch
                            isMulti
                            className="spon-ticket-modal__days-of-week"
                            onChange={(name: string, id: number) => {
                              if (values.days!.includes(id)) {
                                const daysFiltered = values.days!.filter(
                                  (day: number) => day !== id
                                )
                                handleChange({
                                  target: { value: daysFiltered, name: 'days' }
                                })
                              } else {
                                handleChange({
                                  target: {
                                    value: [...values.days!, id],
                                    name: 'days'
                                  }
                                })
                              }
                            }}
                            selectedValues={values.days!}
                            items={daysOfWeek}
                          />
                          <ErrorMessage
                            name="days"
                            component="div"
                            className="spon-ticket-modal__error"
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              ) : null}

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

export default TicketModal