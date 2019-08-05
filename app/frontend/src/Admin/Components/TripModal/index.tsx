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
import Switch from '../Switch'
import Button from '../../../Common/Components/Button'
import { IProps, IFormValues, IEditValues } from './types'
import './styles.scss'
import { ICity } from 'src/Admin/Utils/adminTypes';

const TripModal: React.SFC<IProps> = ({
  isLoading,
  editDate,
  closeModal,
  availableCities,
  handleEditTrip,
  handleSubmit
}) => {
  let editableData = null

  if (editDate) {
    editableData = {
      destination: editDate.destination,
      departure: editDate.departure,
      adultPrice: editDate.adultPrice,
      childPrice: editDate.childPrice,
      discount: editDate.discount,
      duration: editDate.duration,
      type: 'Train',
      carrier: editDate.carrier,
      deselectionPrice: editDate.deselectionPrice,
      timeSelection: {
        defaultPrice: editDate.timeSelection.defaultPrice,
      },
      fake: editDate.fake,
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
                departure: {
                  _id: '',
                  name: ''
                },
                destination: {
                  _id: '',
                  name: ''
                },
                adultPrice: 0,
                childPrice: 0,
                discount: 0,
                duration: 0,
                type: 'Train',
                carrier: '',
                deselectionPrice: 0,
                timeSelection: {
                  defaultPrice: 0,
                },
                fake: false,
                active: false,
              }
        }
        validationSchema={Yup.object().shape({
          destination: Yup.object().required(),
          departure: Yup.object().required(),
          adultPrice: Yup.number()
            .required()
            .min(1),
          childPrice: Yup.number()
            .required()
            .min(1),
          type: Yup.string().required(),
          carrier: Yup.string().required(),
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
          deselectionPrice: Yup.number()
            .required()
            .min(1),
          fake: Yup.bool().required(),
          active: Yup.bool().required()
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

          if (editDate && handleEditTrip) {
            handleEditTrip(dataToUpdate).then(() => resetForm())
          } else if (handleSubmit) {
            const departureCity: ICity = {
              _id: values.departure._id,
              name: ''
            }
            const destinationCity: ICity = {
              _id:values.destination._id,
              name: ''
            } 
            const dataToSubmit: any = {
              ...values,
              departure: departureCity,
              destination: destinationCity
            }
            handleSubmit(dataToSubmit).then(() => resetForm())
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
            <div className="spon-trip-modal__row">
              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt--big">
                <Dropdown
                saveAsObject
                  id="departure"
                  label="Departure"
                  placeholder="Select a city"
                  className="spon-trip-modal__dropdown"
                  selectedValue={values.departure.name}
                  options={availableCities.sort((a,b) => {
                    return a.name > b.name ? 1 : -1
                  })}
                  onChange={handleChange}
                />

                <ErrorMessage
                  name="departure"
                  component="div"
                  className="spon-trip-modal__error"
                />
              </div>
              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt--big">
                <Dropdown
                  saveAsObject
                  id="destination"
                  label="Destination"
                  placeholder="Select a city"
                  className="spon-trip-modal__dropdown"
                  selectedValue={values.destination.name}
                  options={availableCities.filter((city)=>{
                    return city.isEnabled === true ? city : null
                  }).sort((a,b) => {
                    return a.name > b.name ? 1 : -1
                  })
                  }
                  onChange={handleChange}
                />

                <ErrorMessage
                  name="destination"
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

              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt--small spon-trip-modal__input-cnt--last">
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
            </div>

            <div className="spon-trip-modal__row  spon-trip-modal__row--bordered">
              <div className="spon-trip-modal__input-cnt">
                <Dropdown
                  id="type"
                  label="Select the Type"
                  placeholder="Select type"
                  className="spon-trip-modal__dropdown"
                  selectedValue={values.type}
                  options={[
                    {
                      _id: '1',
                      name: 'Train'
                    },
                    {
                      _id: '2',
                      name: 'Bus'
                    }
                  ]}
                  onChange={handleChange}
                />

                <ErrorMessage
                  name="type"
                  component="div"
                  className="spon-trip-modal__error"
                />
              </div>

              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt">
                <Field
                  type="text"
                  placeholder="Type name"
                  name="carrier"
                  label="Carrier"
                  className="spon-trip-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="carrier"
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
                  <p>Fake:</p>
                  <Switch
                    checked={values.fake}
                    onChange={() =>
                      handleChange({
                        target: {
                          id: 'fake',
                          value: !values.fake
                        }
                      })
                    }
                  />
                </div>
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

export default TripModal
