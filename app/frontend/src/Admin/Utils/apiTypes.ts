export interface ILoginForm {
  email: string
  password: string
}

export interface ITrip {
  destination: string
  departure: string
  carrier: string
  photo: string
  price: number
  discount: number
  deselectionPrice: number
  timeSelection: number
  fake: boolean
  active: boolean
  type: string
}

export interface ISchedule {
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
  bidirectionalChange: boolean

}

export interface ITicket {
  trip: string
  direction: string
  quantity: number
  type: string
  date: {
    start: number
    end: number
  }
  active: boolean
}

export interface IEditTicket {
  trip?: string
  direction?: string
  quantity?: number
  type?: string
  date?: {
    start: number
    end: number
  }
  active?: boolean
}
