import { IPassenger } from "src/App/Utils/apiTypes";

export interface IProps {
  quantity: IPassenger
  departure: string
  setQuantity: (quantity: IPassenger) => void
  setDeparture: (departure: string) => void
}
