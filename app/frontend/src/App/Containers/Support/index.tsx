import React, { Component } from 'react'
import Yup from 'yup'
import { Formik, Form, Field, ErrorMessage, FormikActions } from 'formik'
import { RouteComponentProps } from 'react-router-dom'

import Input from '../../Components/Input'
import BlueButton from '../../Components/BlueButton'
import MainBlock from '../../Components/MainBlock'
import Footer from '../../Components/Footer'
import Title from '../../Components/Title'

import withToast from '../../../Common/HOC/withToast'
import { support } from '../../Utils/api'
import { IFormValues, IProps } from './types'
import './styles.scss'

class SupportContainer extends Component<RouteComponentProps<{}> & IProps> {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <>
        <section className="support">
          <MainBlock>
            <Title
              text="How can we help You?"
              selected={['You']}
              className="support-title"
            />
          </MainBlock>
          <div className="support__wrapper">
            <Title
              text="Feel free to Contact Us"
              selected={['Contact Us']}
              className="support-smallTitle"
            />
            <div className="support__info">
              <span>
                Email for press enquiries:&ensp;
                <a
                  href="mailto:support@sponteous.com"
                  className="support__info-bold">
                  support@sponteous.com
                </a>
              </span>
              <span>
                Email for partners:&ensp;
                <a
                  href="mailto:support@sponteous.comm"
                  className="support__info-bold">
                  support@sponteous.com
                </a>
              </span>
            </div>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: ''
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string()
                  .min(3)
                  .required('Firstname is required'),
                lastName: Yup.string()
                  .min(3)
                  .required('Lastname is required'),
                email: Yup.string()
                  .matches(
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,10}))$/,
                    'Email is not valid'
                  )
                  .required('Email is required'),
                phone: Yup.number().required('Phone is required'),
                message: Yup.string()
                  .min(3)
                  .required('Message  is required')
              })}
              onSubmit={(
                values: IFormValues,
                { resetForm }: FormikActions<IFormValues>
              ) => {
                support({
                  ...values,
                  phone: !values.phone.startsWith('+')
                    ? `+${values.phone}`
                    : values.phone
                })
                  .then(() => {
                    this.props.showSuccess('Message sent')
                    resetForm()
                  })
                  .catch(err => {
                    this.props.showError(err, `Can't send the message`)
                  })
              }}
              render={() => (
                <Form>
                  <div className="support__form">
                    <div className="support__input-cnt support__input-cnt--name">
                      <Field
                        name="firstName"
                        component={Input}
                        label="FIRST NAME"
                        className="support__field support__field__name"
                      />

                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="support__form-error"
                      />
                    </div>

                    <div className="support__input-cnt support__input-cnt--name">
                      <Field
                        name="lastName"
                        component={Input}
                        label="LAST NAME"
                        className="support__field"
                      />

                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="support__form-error"
                      />
                    </div>

                    <div className="support__input-cnt support__input-cnt--email">
                      <Field
                        name="email"
                        component={Input}
                        label="EMAIL"
                        className="support__field"
                      />

                      <ErrorMessage
                        name="email"
                        component="div"
                        className="support__form-error"
                      />
                    </div>

                    <div className="support__input-cnt support__input-cnt--phone">
                      <Field
                        name="phone"
                        component={Input}
                        label="PHONE"
                        className="support__field"
                      />

                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="support__form-error"
                      />
                    </div>

                    <div className="support__input-cnt support__input-cnt--messanger">
                      <Field
                        type="textarea"
                        name="message"
                        component={Input}
                        label="MESSAGE"
                        className="support__field support__field--message"
                      />

                      <ErrorMessage
                        name="message"
                        component="div"
                        className="support__form-error"
                      />
                    </div>

                    <BlueButton
                      htmlType="submit"
                      children={['SUBMIT REQUEST']}
                    />
                  </div>
                </Form>
              )}
            />
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

export default withToast(SupportContainer)
