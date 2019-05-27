export interface IProps {
  editDate?: IFormValues & { _id: string }
  isLoading: boolean
  closeModal: () => void
  handleSubmit?: (data: any) => Promise<void>
  handleEditTrip?: (data: IEditValues) => Promise<void>
}

export interface IFormValues {
  name: string
  price: number
  discount: number
  duration: number
  type: string
  deselectionPrice: number
  fake: boolean
  active: boolean
  photo: string
}

export type IEditValues = Partial<IFormValues>
