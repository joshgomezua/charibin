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
    departure: string
    destination: string
   }
  direction: string
  quantity: number
  soldTickets: number,
  reservedQuantity: number,
  type: string
  hours?: string
  date: {
    start: string
    end: string
  }
  active: boolean
}
