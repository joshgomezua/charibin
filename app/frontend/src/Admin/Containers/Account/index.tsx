import * as React from 'react'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { Formik, FormikActions, FormikProps, Field, ErrorMessage } from 'formik'
import { RouteComponentProps } from 'react-router-dom'

import Info from '../../Components/Info'
import Input from '../../Components/Input'
import Button from '../../../Common/Components/Button'

import { loginUser } from '../../../Common/Redux/Services/user'
import { IFormValues, IProps, IState } from './types'
import './styles.scss'
import { getUserData } from 'src/Common/Utils/helpers';

class AccountContainer extends React.Component<
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
    const userData: any = getUserData();

    return (
      <div className="spon-account">
        <Formik
          initialValues={{
            email: userData.user.email,
            newPassword: '',
            oldPassword: '',
            confirmPassword: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .label('Email')
              .email()
              .required('Email field is required!'),
            oldPassword: Yup.string()
              .label('Current password')
              .min(6)
              .required('Password field is required!'),
            newPassword: Yup.string()
              .label('New password')
              .min(6)
              .required('Password field is required!'),
            confirmPassword: Yup.string()
              .required('Confirmation field is required!')
              .label('Confirm password')
              .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
          })}
          onSubmit={(
            values: IFormValues,
            { setSubmitting }: FormikActions<IFormValues>
          ) => {
            // this.setState({ isLoading: true })
            // loginUser(values)
            //   .then(() => {
            //     setSubmitting(false)
            //     this.props.history.push(
            //       `${ADMIN_ROUTING.MAIN}${ADMIN_ROUTING.TRIPS}`
            //     )
            //   })
            //   .catch((errorMessage: string) => {
            //     setSubmitting(false)
            //     this.setState(
            //       {
            //         isLoading: false,
            //         error: {
            //           msg: errorMessage
            //         }
            //       },
            //       () =>
            //         setTimeout(
            //           () => this.setState({ error: { msg: '' } }),
            //           5000
            //         )
            //     )
            //   })
          }}
          render={({ handleSubmit }: FormikProps<IFormValues>) => (
            <div className="spon-account__card">
              <div className="spon-account__inner">
                <h1 className="spon-account__heading">Account</h1>
              </div> 
              <form className="spon-account__form" onSubmit={handleSubmit}>
                <div className="spon-account__input-container-email spon-account__input-container-email--last">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    disabled={true}
                    value={userData.user.email}
                  />
                </div>

                <div className="spon-account__input-container spon-account__input-container--last">
                  <Field
                    type="password"
                    label="Current password"
                    name="oldPassword"
                    component={Input}
                  />
                  <ErrorMessage
                    name="oldPassword"
                    component="div"
                    className="spon-account__error"
                  />
                </div>

                <div className="spon-account__input-container spon-account__input-container--last">
                  <Field
                    type="password"
                    label="New password"
                    name="newPassword"
                    component={Input}
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="spon-account__error"
                  />
                </div>

                <div className="spon-account__input-container spon-account__input-container--last">
                  <Field
                    type="password"
                    label="Confirm password"
                    name="confirmPassword"
                    component={Input}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="spon-account__error"
                  />
                </div>

                <Info isError>{this.state.error.msg}</Info>

                <div className="spon-account__submit">
                  <Button
                    isLoading={this.state.isLoading}
                    variant="adminPrimary"
                    onClick={handleSubmit}
                    text="Change password"
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
)(AccountContainer)
