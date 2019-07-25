import { ITicket } from "src/Common/Utils/globalTypes";

export interface IProps {
  initialValue?: string
  departure: string
  quantity: number
  setQuantity?: (quantity: number) => void
  setDeparture?: (departure: string) => void
  onSubmit: (e: any) => void
}

export interface IState {
  inputValue: string
  buttons: boolean
  tickets: ITicket[]
}
