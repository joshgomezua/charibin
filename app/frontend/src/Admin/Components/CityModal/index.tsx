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
import Button from '../../../Common/Components/Button'
import photoSvg from '../../../Common/Utils/Media/photo.svg'
import { COUNTRIES } from '../../Utils/constants'
import { IProps, IFormValues, IEditValues } from './types'
import './styles.scss' 
import Tag from '../Tag';
import DropDownSelect from '../DropdownSelect'

const CityModal: React.SFC<IProps> = ({
  isLoading,
  editDate,
  closeModal,
  handleEditCity,
  handleSubmit
}) => {
  let editableData = null
  const TAG = "tags"

  if (editDate) {
    editableData = {
      name: editDate.name,
      country: editDate.country,
      tags: editDate.tags,
      photo: editDate.photo,
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
                name: '',
                country: '',
                tags: [],
                photo: '',
                isManual: false
            }
        }
        validationSchema={Yup.object().shape({
          name: Yup.string().required(),
          country: Yup.string().required(),
          photo: Yup.string().required(),
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
                values[key] !== editDate![key] || (key === TAG)
              ) {
                dataToUpdate[key] = values[key]
              } 
            }
          }

          if (editDate && handleEditCity) {
            handleEditCity(dataToUpdate).then(() => resetForm())
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
                  placeholder="Enter your city"
                  name="name"
                  label="Name of city"
                  className="spon-trip-modal__input"
                  classNamelabel="spon-trip-modal__label"
                  component={Input}
                />
              
                <ErrorMessage
                  name="name"
                  component="div"
                  className="spon-trip-modal__error"
                />
              </div>

              <div className="spon-trip-modal__input-cnt spon-trip-modal__input-cnt--big">
                <DropDownSelect
                  id="country"
                  label="Name of the country"
                  placeholder="Select country"
                  className="spon-trip-modal__dropdown"
                  selectedValue={values.country? values.country : ""}
                  options={COUNTRIES.sort((a,b) => {
                    return a.name > b.name ? 1:-1
                  })}
                  onChange={handleChange}
                />

                <ErrorMessage
                  name="country"
                  component="div"
                  className="spon-trip-modal__error"
                />
              </div>
            </div>
            <div className="spon-trip-modal__row spon-trip-modal__row--bordered spon-trip-modal__row--noflex">
              <p className="spon-trip-modal__label">Upload photo</p>

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
              <div className="spon-trip-modal__tagsbtn">
                  <Tag
                    tags = {values[TAG] as string []}
                    editDate = {editDate}
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

export default CityModal
