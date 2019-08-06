import { ICity } from "src/Admin/Utils/adminTypes";

export interface IProps {
  editDate?: IFormValues & { _id: string }
  availableCities: ICity[]
  isLoading: boolean
  closeModal: () => void
  handleSubmit?: (data: any) => Promise<void>
  handleEditTrip?: (data: IEditValues) => Promise<void>
}

export interface IFormValues {
  departure: ICity
  destination: ICity
  carrier: string
  adultPrice: number
  childPrice: number
  discount: number
  duration: number
  type: string
  timeSelection: {
    defaultPrice: number
  }
  deselectionPrice: number
  fake: boolean
  active: boolean
}

export interface IOption {
  _id: string,
  name: string
}

export type IEditValues = Partial<IFormValues>
