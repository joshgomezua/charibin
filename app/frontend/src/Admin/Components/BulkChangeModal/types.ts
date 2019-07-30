
export interface IProps {
  isLoading: boolean
  closeModal: () => void
  handleSubmit?: (data: any) => Promise<void>
  handleEditTrip?: (data: IEditValues) => Promise<void>
}

export interface IFormValues {
  carrier: string
  price: number
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
