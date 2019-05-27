export interface IProps {
  isAdminPage: boolean
  isLoggedIn: boolean
  email: string
  openPopup: () => void
}

export interface IState {
  burgerOpen: boolean
}
