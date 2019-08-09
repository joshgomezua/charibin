import { IScheduledTrip } from "src/Common/Utils/globalTypes";


export interface ILoginForm {
  email: string
  password: string
}

export interface ITrip {
  destination: ICity
  departure: ICity
  carrier: string
  photo?: string
  adultPrice: number
  childPrice: number
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
  isFromAPI: boolean
}


export interface INewTrip {
  destination: ICity
  departure: ICity
  carrier: string
  adultPrice: number
  childPrice: number
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
  scheduledTrips?: IScheduledTrip[]
  fake: boolean
  active: boolean
  type: string
  isFromAPI: boolean
}

export interface INewScheduledTrip {
  adultPrice: number
  childPrice: number
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
  destination?: ICity
  departure?: ICity
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

export interface ICity {
  name: string
  country?:string
  tags?: string[]
  photo?: string
  isManual?: boolean
  isEnabled?: boolean
}

export interface IUser {
  active: boolean
  email: string
  name: string
  role: string
  isDeleted?: boolean

}

export interface IEditUser {
  //user?: string
  active?: boolean
  email?: string
  name?: string
  role?: string
}


export interface ITicket {
  trip: string
  departure: string
  destination: string
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
  quantity?: number
  type?: string
  date?: {
    start: number
    end: number
  }
  active?: boolean
}
