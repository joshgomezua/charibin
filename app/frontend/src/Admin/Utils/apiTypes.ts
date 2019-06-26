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
    _0to6AM?: number
    _6to8AM?: number
    _8to10AM?: number
    _10to12PM?: number
    _12to2PM?: number
    _2to4PM?: number
    _4to6PM?: number
    _6to8PM?: number
    _8to10PM?: number
    _10to12AM?: number
  }
  fake: boolean
  active: boolean
  type: string
}

export interface INewScheduledTrip {
  price: number
  discount: number
  deselectionPrice: number
  timeSelection: {
    defaultPrice: number
    _0to6AM?: number
    _6to8AM?: number
    _8to10AM?: number
    _10to12PM?: number
    _12to2PM?: number
    _2to4PM?: number
    _4to6PM?: number
    _6to8PM?: number
    _8to10PM?: number
    _10to12AM?: number
  }
  date: {
    start: string
    end: string
  }
  active: boolean
  trip?: string
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
  fake?: boolean
  active?: boolean
  type?: string
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
