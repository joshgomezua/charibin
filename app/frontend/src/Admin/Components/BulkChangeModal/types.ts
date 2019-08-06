
export interface IProps {
  isLoading: boolean
  closeModal: () => void
  handleSubmit?: (data: any) => Promise<void>
  handleEditTrip?: (data: IEditValues) => Promise<void>
}

export interface IFormValues {
  adultPrice: number
  childPrice: number
  discount: number
  duration: number
  timeSelection: {
    defaultPrice: number
  }
  deselectionPrice: number
  fake: string
  active: string
}

export interface IOption {
  _id: string,
  name: string
}

export type IEditValues = Partial<IFormValues>
