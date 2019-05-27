import * as React from 'react'
import { Field, Form, withFormik } from 'formik'

import { FormInput } from '../FormInput/Input'
import Dropdown from '../Dropdown'
import { RequiredLabel } from '../FormInput/RequiredAsterisk'

import { COUNTRY_CODES } from '../../Utils/constants'
import { PassengerFormSchema } from './PassengerForm.schema'
import { IFormValues, IOuterProps, Props } from './types'
import './styles.scss'

type FnGetValues = typeof PassengerFormBase.prototype.getValues
type FnTouchAll = typeof PassengerFormBase.prototype.touchAll
type FnValidate = typeof PassengerFormBase.prototype.validate

export interface IPassengerFormControls {
  getValues: FnGetValues
  validate: FnValidate
  touchAll: FnTouchAll
}

class PassengerFormBase extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
    if (typeof props.getFormControls === 'function') {
      props.getFormControls({
        touchAll: this.touchAll.bind(this),
        validate: this.validate.bind(this),
        getValues: this.getValues.bind(this)
      })
    }
  }

  getValues() {
    return this.props.values
  }

  validate() {
    return this.props.validateForm()
  }

  touchAll() {
    this.props.setTouched({
      firstName: true,
      middleName: true,
      lastName: true,
      countryCode: true,
      phone: true,
      email: true,
      birthyear: true,
      birthmonth: true,
      birthdate: true
    })
  }

  render() {
    const { values, handleChange } = this.props
    return (
      <Form className="form primary_pass">
        <Field
          type="text"
          name="firstName"
          component={FormInput}
          container={{ className: 'primary_pass-name' }}
          label={{ elem: <RequiredLabel text="FIRST NAME" /> }}
        />
        <Field
          type="text"
          name="middleName"
          component={FormInput}
          container={{ className: 'primary_pass-name' }}
          label={{ text: 'MIDDLE NAME' }}
        />
        <Field
          type="text"
          name="lastName"
          component={FormInput}
          container={{ className: 'primary_pass-name' }}
          label={{ elem: <RequiredLabel text="LAST NAME" /> }}
        />

        <Dropdown
          withFormik
          id="countryCode"
          label={<RequiredLabel text="PHONE NUMBER" />}
          placeholder=""
          className="primary_pass-country"
          selectedValue={values.countryCode}
          options={COUNTRY_CODES}
          onChange={handleChange}
        />

        <Field
          type="text"
          name="phone"
          component={FormInput}
          label={{ elem: <RequiredLabel text="PHONE NUMBER" /> }}
          container={{ className: 'primary_pass-phone' }}
        />

        <Field
          type="email"
          name="email"
          component={FormInput}
          container={{ className: 'primary_pass-email' }}
          label={{ elem: <RequiredLabel text="EMAIL" /> }}
        />
        <div className="primary_pass-date-wrapper">
          <p>
            <RequiredLabel text="DATE OF BIRTH" />
          </p>
          <Field
            type="number"
            name="birthyear"
            min={1900}
            max={new Date().getFullYear()}
            component={FormInput}
            placeholder="Year"
            container={{ className: 'primary_pass-date' }}
          />
          <Field
            type="number"
            name="birthmonth"
            min={1}
            max={12}
            placeholder="Month"
            component={FormInput}
            container={{ className: 'primary_pass-date' }}
          />
          <Field
            type="number"
            name="birthdate"
            placeholder="Day"
            min={1}
            max={31}
            component={FormInput}
            container={{ className: 'primary_pass-date' }}
          />
        </div>
      </Form>
    )
  }
}

export const PassengerForm = withFormik<
  Partial<IFormValues> & IOuterProps,
  IFormValues
>({
  handleSubmit() {},
  mapPropsToValues: () => ({
    countryCode: COUNTRY_CODES[0]
  }),
  validationSchema: PassengerFormSchema,
  validateOnBlur: true,
  validateOnChange: false
})(PassengerFormBase)
