import { ISelectedData, IFinalSelected } from '../../App/Utils/appTypes'

export interface IStore {
  user: IUser
  trips: ITips
  adminTickets: IAdminTickets
}

interface IUser {
  isLoggedIn: boolean
  user: {
    email: string
  }
  token: string
}

interface ITips {
  departure: string
  quantity: number
  selected: ISelectedData[]
  deselected: ISelectedData[]
  finalDestination: IFinalSelected
}

interface IAdminTickets {
  filters: string[]
  filterFrom: string[]
  filterTo: string[]
  selectedDate: Date
}
