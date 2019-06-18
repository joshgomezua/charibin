export interface IAdmin {
  email: string
}

export interface ICity {
  _id: string
  name: string
}

export interface ITrip {
  _id: string
  active: boolean
  deselectionPrice: number
  timeSelection: {
    defaultPrice: number
    time1: number
    time2: number
    time3: number
    time4: number
    time5: number
    time6: number
    time7: number
    time8: number
    time9: number
    time10: number
  }
  scheduledTrips: {
    trip1: {
      price: number,
      discount: number,
      date: {
        start: string,
        end: string,
      }
    },
    trip2: {
      price: number,
      discount: number,
      date: {
        start: string,
        end: string,
      }
    },
  },
  discount: number
  duration: number
  fake: boolean
  departure: string
  destination: string
  carrier: string
  photo: string
  price: number
  type: string
}

// export interface ITimeSelectSchedule {
//   defaultPrice: number
//   time1: number
//   time2: number
//   time3: number
//   time4: number
//   time5: number
//   time6: number
//   time7: number
//   time8: number
//   time9: number
//   time10: number
// }

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
  'EDIT_TIME_SELECTION',
  'DELETE_SCHEDULE'
}
