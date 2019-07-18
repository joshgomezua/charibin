export interface IFormValues {
  email: string
  newPassword: string
  oldPassword: string
}

export interface IProps {
  loginUser: (
    loginCredentials: { email: string; password: string }
  ) => Promise<void>
}

export interface IState {
  isLoading: boolean
  error: {
    msg: string
  }
}
