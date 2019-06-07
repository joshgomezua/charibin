import React from 'react'
import {
  Formik,
  FormikActions,
  Form,
  Field,
  FormikProps,
  ErrorMessage
} from 'formik'
import FileInput from '../../Components/FileInput'
import * as Yup from 'yup'

import Input from '../Input'
import Dropdown from '../Dropdown'
import Switch from '../Switch'
import Button from '../../../Common/Components/Button'
import photoSvg from '../../../Common/Utils/Media/photo.svg'

import { IProps, IFormValues, IEditValues } from './types'
import './styles.scss'

const TripModal: React.SFC<IProps> = ({
  isLoading,
  editDate,
  closeModal,
  handleEditTrip,
  handleSubmit
}) => {
  let editableData = null

  if (editDate) {
    editableData = {
      destination: editDate.destination,
      departure: editDate.departure,
      price: editDate.price,
      discount: editDate.discount,
      duration: editDate.duration,
      type: 'Train',
      deselectionPrice: editDate.deselectionPrice,
      fake: editDate.fake,
      active: editDate.active,
      photo: editDate.photo
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
                departure: '',
                destination: '',
                price: 0,
                discount: 0,
                duration: 0,
                type: 'Train',
                deselectionPrice: 0,
                fake: false,
                active: false,
                photo: ''
              }
        }
        validationSchema={Yup.object().shape({
          destination: Yup.string()
            .min(3)
            .required(),
          departure: Yup.string()
            .min(3)
            .required(),
          price: Yup.number().required(),
          type: Yup.string().required(),
          discount: Yup.number().required(),
          duration: Yup.number()
            .min(1)
            .max(100000)
            .required(),
          deselectionPrice: Yup.number().required(),
          timeSelection: Yup.number().required(),
          fake: Yup.bool().required(),
          active: Yup.bool().required(),
          photo: Yup.string().required()
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
            <div className="spon-trip-modal__row">
              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt--big">
                <Field
                  type="text"
                  placeholder="Type name"
                  name="destination"
                  label="Name of trip"
                  className="spon-trip-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="destination"
                  component="div"
                  className="spon-trip-modal__error"
                />
              </div>

              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt--small">
                <Field
                  isPrefix
                  type="number"
                  name="price"
                  label="Set Price"
                  className="spon-trip-modal__input"
                  component={Input}
                />

                <ErrorMessage
                  name="price"
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

            <div className="spon-trip-modal__row">
              <div className="spon-trip-modal__input-cnt">
                <Dropdown
                  id="type"
                  label="Select the Type"
                  placeholder="Select type"
                  className="spon-trip-modal__dropdown"
                  selectedValue="Train"
                  options={[
                    {
                      _id: '1',
                      name: 'Train'
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

              <div className="spon-trip-modal__input-cnt">
                <Field
                  isPrefix
                  type="number"
                  placeholder="£"
                  name="deselectionPrice"
                  label="Deselection Price"
                  className="spon-trip-modal__input"
                  component={Input}
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

            <div className="spon-trip-modal__row  spon-trip-modal__row--bordered">
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
            </div>

            <div className="spon-trip-modal__row spon-trip-modal__row--bordered spon-trip-modal__row--noflex">
              <p className="spon-trip-modal__label">Add trip cover</p>

              <div className="spon-trip-modal__avatar">
                <div className="spon-trip-modal__photo">
                  {!values.photo ? (
                    <div className="spon-trip-modal__photo-cover">
                      <img src={photoSvg} alt="" />
                    </div>
                  ) : (
                    <div
                      className="spon-trip-modal__photo-cover"
                      style={{ backgroundImage: `url(${values.photo})` }}
                    />
                  )}
                </div>

                <div className="spon-trip-modal__photo-input">
                  <FileInput
                    label="UPLOAD FILE"
                    handleChange={handleChange}
                    handleSetError={(name, msg) => setFieldError(name, msg)}
                  />
                </div>
              </div>
              {errors.photo && touched.photo ? (
                <div className="spon-trip-modal__error">{errors.photo}</div>
              ) : null}
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
