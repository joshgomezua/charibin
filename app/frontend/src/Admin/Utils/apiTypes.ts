export interface ILoginForm {
  email: string
  password: string
}

export interface ITrip {
  name: string
  photo: string
  price: number
  discount: number
  deselectionPrice: number
  fake: boolean
  active: boolean
  type: string
}

export interface ICity {
  name: string
  country?:string
  tags?: string[]
  photo?: string
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
