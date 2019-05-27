export interface IFormValues {
  email: string
  password: string
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
