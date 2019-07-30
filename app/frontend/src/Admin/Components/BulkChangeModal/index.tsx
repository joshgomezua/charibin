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
import { IProps, IFormValues } from './types'
import './styles.scss'

const BulkChangeModal: React.SFC<IProps> = ({
  isLoading,
  closeModal,
  handleSubmit
}) => {
  let editableData = null

  return (
    <div className="spon-trip-modal">
      <Formik
        enableReinitialize
        initialValues={
          editableData
            ? editableData
            : {
                price: 0,
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
          price: Yup.number(),
          type: Yup.string(),
          carrier: Yup.string(),
          discount: Yup.number(),
          duration: Yup.number(),
          timeSelection: Yup.object().shape({
            defaultPrice: Yup.number()
          }),
          deselectionPrice: Yup.number(),
          fake: Yup.bool(),
          active: Yup.bool()
        })}
        onSubmit={(
          values: IFormValues,
          { resetForm }: FormikActions<IFormValues>
        ) => {
          if(handleSubmit){
            console.log(values)
            handleSubmit(values).then(() => resetForm())
          }
        }}
        render={({
          handleChange,
          values,
        }: FormikProps<IFormValues>) => (
          <Form noValidate>
            <div className="spon-trip-modal__row">
              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt">
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
                      _id: '0',
                      name: 'No selection'
                    },
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
                  text={'EDIT'}
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

export default BulkChangeModal
