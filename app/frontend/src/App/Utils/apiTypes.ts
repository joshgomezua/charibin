import { IFormValues } from '../Containers/Support/types'

interface ISelectedTrips {
  id: string
  dateStart: number
  dateEnd: number
  departure: string
  destination: string
}


interface ISelectedTickets {
  arrivalTicket: string
  departureTicket: string
}

export interface IBookedData {
  departure?: string
  Adult: number
  Youth: number
  ownerHash?: string
  trips: Array<ISelectedTrips | ISelectedTickets>
}

export interface IPassenger {
  Adult: number,
  Youth: number
}
export interface IUnbookedData {
  owner: string
  trips: string[]
}

export interface ISupportData extends IFormValues {}

export interface IBuyData {
  owner: string
  creditCardToken: string
  buyerInfo: {
    email: string
    firstName: string
    middleName: string
    lastName: string
    birthDate: number
    phone: string
    address: string
    city: string
    zipCode: string
  }
}
