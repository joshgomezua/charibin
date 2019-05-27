export enum USER_ACTIONS {
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER'
}

export interface ILogin {
  type: USER_ACTIONS.LOGIN_USER
  user: {
    _id: string
    email: string
    role: string
  }
}

export interface ILogout {
  type: USER_ACTIONS.LOGOUT_USER
}

export type IUserActions = ILogin | ILogout
