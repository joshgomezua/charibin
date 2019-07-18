import { ITicket } from '../../Common/Utils/globalTypes'
import { ICity } from 'src/Admin/Utils/apiTypes';

export interface ITrip {
  _id: string
  deselectionPrice: number
  discount: number
  photo: string
  price: number
  duration: number
  tickets: ITicket[]
  type: 'trip'
  dateStart?: number
  dateEnd?: number
  departure: ICity
  destination: ICity
  info?: {
    arrivalTicketsQty: number
    departureTicketsQty: number
  }
  
}

export interface ISelectedData {
  tripId: string
  dateStart: number
  dateEnd: number
  deselectionPrice: number
  discount: number
  duration: number
  photo: string
  price: number
  type: 'selectedTrid'
  arrivalTicket?: string
  departureTicket?: string
  departure: ICity,
  destination: ICity
}

export interface IFinalSelected {
  name: string
  photo: string
  email: string
  arrivalTicket: {
    _id: string
    date: {
      start: Date
      end: Date
    }
    type: string
  }
  departureTicket: {
    _id: string
    date: {
      start: Date
      end: Date
    }
    type: string
  }
  finalCost: number
  chargeId: string
}
