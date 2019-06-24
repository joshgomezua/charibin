export interface IAdmin {
  email: string
}

export interface ITag {
  name: string
  isSelected: boolean
}

export interface ICity {
  _id: string
  name: string
  country?: string;
  photo?: string;
  tags?: string[];   
  isModify?: boolean;
  isEnabled?: boolean;
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
  departure: string
  destination: string
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
  'ADD_CITY',
  'EDIT_CITY',
  'DELETE_CITY',
}
