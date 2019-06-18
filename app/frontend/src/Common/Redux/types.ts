import { DIRECTION_TYPE } from '../../Admin/Utils/adminTypes'
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
  quantity: number
  selected: ISelectedData[]
  deselected: ISelectedData[]
  finalDestination: IFinalSelected
}

interface IAdminTickets {
  direction: DIRECTION_TYPE | null
  filters: string[]
  filterFrom: string[]
  filterTo: string[]
  selectedDate: Date
}
