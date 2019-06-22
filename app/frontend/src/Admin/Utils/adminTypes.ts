export interface IAdmin {
  email: string
}

export interface ICity {
  _id: string
  name: string
}

export interface IUser {
  _id: string
  active: boolean
  email: string
  name: string
  role: string
  password: string

}


export interface ITrip {
  _id: string
  active: boolean
  deselectionPrice: number
  discount: number
  duration: number
  fake: boolean
  name: string
  photo: string
  price: number
  type: string
}

export interface IOrder {
  _id: string
  name: string
  phone: string
  birthDate: string
  zipCode: string
  selected: string
  deselected: string
  finalSelection: string
  finalDestination: string
  date: {
    arrival: {
      start: string
      end: string
    }
    departure: {
      start: string
      end: string
    }
  }
  price: number
  sent: boolean
  createdAt: string
}

export enum DIRECTION_TYPE {
  DEPARTURES = 'departure',
  ARRIVALS = 'arrival'
}

export enum MODAL_TYPE {
  'ADD_TRIP',
  'EDIT_TRIP',
  'DELETE_TRIP',
  'ADD_TICKET',
  'EDIT_TICKET',
  'DELETE_TICKET',
  'ADD_USER',
  'EDIT_USER',
  'DELETE_USER',
  'RESET_PASSWORD'
}
 