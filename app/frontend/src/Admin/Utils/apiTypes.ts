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
  fake: boolean
  active: boolean
  type: string
}

export interface INewTrip {
  destination: string
  departure: string
  carrier: string
  photo: string
  price: number
  discount: number
  deselectionPrice: number
  timeSelection: {
    defaultPrice: number
    time1?: number
    time2?: number
    time3?: number
    time4?: number
    time5?: number
    time6?: number
    time7?: number
    time8?: number
    time9?: number
    time10?: number
  }
  fake: boolean
  active: boolean
  type: string
}

export interface IEditTimeSelect {
  destination?: string
  departure?: string
  carrier?: string
  photo?: string
  price?: number
  discount?: number
  deselectionPrice?: number
  timeSelection: {
    defaultPrice?: number
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
  fake?: boolean
  active?: boolean
  type?: string
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

// } double check

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
