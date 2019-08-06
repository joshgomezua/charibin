import * as moment from 'moment'

export interface IDuration extends moment.Duration {
  format: (
    template?: string,
    precision?: number,
    settings?: IDurationSettings
  ) => string
}

interface IDurationSettings {
  forceLength: boolean
  precision: number
  template: string
  trim: boolean | 'left' | 'right'
}

export interface IError {
  data?: {
    message: string
  }
  statusText: string
}

export interface IResponseError {
  response: {
    data?: {
      message: string
    }
    statusText: string
  }
}

export interface ITicket {
  _id: string
  trip: { 
    _id: string; 
    departure: string,
    destination: string,
    type: string,
    carrier: string,
    duration: number,
  }
  quantity: number
  soldTickets: number,
  reservedQuantity: number,
  destination: string,
  departure: string,
  adultPrice: number,
  childPrice: number,
  carrier?: string
  type: string
  date: {
    start: string
    end: string
  }
  active: boolean
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
  adultPrice: number
  childPrice: number
  trip: string
}
