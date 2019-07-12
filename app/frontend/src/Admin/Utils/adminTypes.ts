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
  isManual?: boolean;
  isEnabled?: boolean;
}

export interface IUser {
  _id: string
  active: boolean
  email: string
  name: string
  role: string
  password: string
  isDeleted: boolean

}
export interface IScheduledTrip {
  _id: string
  active: boolean
  deselectionPrice: number
  timeSelection: {
    defaultPrice: number
    _0to6AM: number
    _6to8AM: number
    _8to10AM: number
    _10to12PM: number
    _12to2PM: number
    _2to4PM: number
    _4to6PM: number
    _6to8PM: number
    _8to10PM: number
    _10to12AM: number
  }
  date: {
    start: string
    end: string  
  }
  discount: number
  duration: number
  price: number
  trip: string

}

export interface ITrip {
  _id: string
  active: boolean
  deselectionPrice: number
  timeSelection: {
    defaultPrice: number
    _0to6AM: number
    _6to8AM: number
    _8to10AM: number
    _10to12PM: number
    _12to2PM: number
    _2to4PM: number
    _4to6PM: number
    _6to8PM: number
    _8to10PM: number
    _10to12AM: number
  }
  scheduledTrips: IScheduledTrip[]
  discount: number
  duration: number
  fake: boolean
  departure: string
  destination: string
  carrier: string
  photo?: string
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
  User: string
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
  'EDIT_TIME_SELECTION',
  'ADD_SCHEDULE',
  'DELETE_SCHEDULE',
  'EDIT_SCHEDULE',
  'EDIT_TIME_SELECTION_SCHEDULE',
  'ADD_CITY',
  'EDIT_CITY',
  'DELETE_CITY',
  'ADD_USER',
  'EDIT_USER',
  'DELETE_USER',
  'RESET_PASSWORD'
}
 