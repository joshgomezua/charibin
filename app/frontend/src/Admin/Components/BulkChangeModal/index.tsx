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
import Button from '../../../Common/Components/Button'
import { IProps, IFormValues, IOption } from './types'
import './styles.scss'

const BulkChangeModal: React.SFC<IProps> = ({
  isLoading,
  closeModal,
  handleSubmit
}) => {
  let editableData = null

  const fakeChoices : IOption[] = [{ _id: '0', name: 'No change' },{ _id: '1', name: 'All fake' },{ _id: '2', name: 'None fake' }]

  const activeChoices : IOption[] = [{ _id: '0', name: 'No change' },{ _id: '1', name: 'All active' },{ _id: '2', name: 'None active' }]

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
                fake: 'No change',
                active: 'No change',
              }
        }
        validationSchema={Yup.object().shape({
          adultPrice: Yup.number()
            .min(0),
          childPrice: Yup.number()
            .min(0),
          discount: Yup.number().min(0),
          duration: Yup.number().min(0).max(100000),
          timeSelection: Yup.object().shape({
            defaultPrice: Yup.number().min(0)
          }),
          deselectionPrice: Yup.number().min(0),
          fake: Yup.string().required(),
          active: Yup.string().required()
        })}
        onSubmit={(
          values: IFormValues,
          { resetForm }: FormikActions<IFormValues>
        ) => {
          if(handleSubmit){
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

            <div className="spon-trip-modal__row spon-trip-modal__row--bordered">
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
              
              <div className="spon-trip-modal__input-cnt">
                <Dropdown
                  id="active"
                  label="Active"
                  placeholder="Select type"
                  className="spon-trip-modal__dropdown"
                  selectedValue={values.active}
                  options={activeChoices}
                  onChange={handleChange}
                />

                <ErrorMessage
                  name="active"
                  component="div"
                  className="spon-trip-modal__error"
                />
              </div>
           
              <div className="spon-trip-modal__input-cnt">
                <Dropdown
                  id="fake"
                  label="Fake"
                  placeholder="Select type"
                  className="spon-trip-modal__dropdown"
                  selectedValue={values.fake}
                  options={fakeChoices}
                  onChange={handleChange}
                />

                <ErrorMessage
                  name="fake"
                  component="div"
                  className="spon-trip-modal__error"
                />
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
