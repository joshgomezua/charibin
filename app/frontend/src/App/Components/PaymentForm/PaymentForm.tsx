import { Field, Form, withFormik } from 'formik'
import * as React from 'react'
import { FormInput } from '../FormInput/Input'
import { RequiredLabel } from '../FormInput/RequiredAsterisk'
import { PaymentFormSchema } from './PaymentForm.schema'
import './styles.scss'
import { IFormValues, IOuterProps, Props } from './types'

type FnGetValues = typeof PaymentFormBase.prototype.getValues
type FnTouchAll = typeof PaymentFormBase.prototype.touchAll
type FnValidate = typeof PaymentFormBase.prototype.validate

export interface IPaymentFormControls {
  getValues: FnGetValues
  validate: FnValidate
  touchAll: FnTouchAll
}

class PaymentFormBase extends React.Component<Props, {}> {
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
      address: true,
      city: true,
      zipCode: true
    })
  }

  render() {
    return (
      <Form className="form payment">
        <Field
          name="address"
          type="text"
          container={{ className: 'payment-address' }}
          label={{ elem: <RequiredLabel text="BILLING ADDRESS" /> }}
          component={FormInput}
        />
        <Field
          name="city"
          type="text"
          container={{ className: 'payment-city' }}
          label={{ elem: <RequiredLabel text="CITY" /> }}
          component={FormInput}
        />
        <Field
          name="zipCode"
          type="text"
          container={{ className: 'payment-code' }}
          label={{ elem: <RequiredLabel text="POSTAL CODE" /> }}
          component={FormInput}
        />
      </Form>
    )
  }
}

export const PaymentForm = withFormik<
  Partial<IFormValues> & IOuterProps,
  IFormValues
>({
  handleSubmit() {},
  validationSchema: PaymentFormSchema,
  validateOnBlur: true,
  validateOnChange: false
})(PaymentFormBase)
