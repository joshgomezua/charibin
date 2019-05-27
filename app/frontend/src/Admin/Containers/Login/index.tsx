import * as React from 'react'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { Formik, FormikActions, FormikProps, Field, ErrorMessage } from 'formik'
import { RouteComponentProps } from 'react-router-dom'

import Info from '../../Components/Info'
import Input from '../../Components/Input'
import Button from '../../../Common/Components/Button'
import Logo from '../../../Common/Utils/Media/logo_blue.png'

import { loginUser } from '../../../Common/Redux/Services/user'
import { ADMIN_ROUTING } from '../../Utils/constants'
import { IFormValues, IProps, IState } from './types'
import './styles.scss'

class LoginContainer extends React.Component<
  RouteComponentProps<{}> & IProps,
  IState
> {
  state: Readonly<IState> = {
    isLoading: false,
    error: {
      msg: ''
    }
  }

  render() {
    const { loginUser } = this.props

    return (
      <div className="spon-login">
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .label('Email')
              .email()
              .required('Email field is required!'),
            password: Yup.string()
              .label('Password')
              .min(6)
              .required('Password field is required!')
          })}
          onSubmit={(
            values: IFormValues,
            { setSubmitting }: FormikActions<IFormValues>
          ) => {
            this.setState({ isLoading: true })
            loginUser(values)
              .then(() => {
                setSubmitting(false)
                this.props.history.push(
                  `${ADMIN_ROUTING.MAIN}${ADMIN_ROUTING.TRIPS}`
                )
              })
              .catch((errorMessage: string) => {
                setSubmitting(false)
                this.setState(
                  {
                    isLoading: false,
                    error: {
                      msg: errorMessage
                    }
                  },
                  () =>
                    setTimeout(
                      () => this.setState({ error: { msg: '' } }),
                      5000
                    )
                )
              })
          }}
          render={({ handleSubmit }: FormikProps<IFormValues>) => (
            <div className="spon-login__card">
              <div className="spon-login__logo">
                <img src={Logo} alt="" />
              </div>

              <form className="spon-login__form" onSubmit={handleSubmit}>
                <div className="spon-login__input-container">
                  <Field
                    type="email"
                    label="E-mail"
                    name="email"
                    component={Input}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="spon-login__error"
                  />
                </div>

                <div className="spon-login__input-container spon-login__input-container--last">
                  <Field
                    type="password"
                    label="Password"
                    name="password"
                    component={Input}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="spon-login__error"
                  />
                </div>

                <Info isError>{this.state.error.msg}</Info>

                <div className="spon-login__submit">
                  <Button
                    isLoading={this.state.isLoading}
                    variant="adminPrimary"
                    onClick={handleSubmit}
                    text="Log in"
                    type="submit"
                  />
                </div>
              </form>
            </div>
          )}
        />
      </div>
    )
  }
}

export default connect(
  null,
  { loginUser }
)(LoginContainer)
