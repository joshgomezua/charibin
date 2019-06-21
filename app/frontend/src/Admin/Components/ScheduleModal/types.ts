export interface IProps {
  editDate?: IFormValues & { _id: string }
  isLoading: boolean
  closeModal: () => void
  handleSubmit?: (data: any) => Promise<void>
  handleEditSchedule?: (data: IEditValues) => Promise<void>
}

export interface IFormValues {
  price: number
  discount: number
  duration: number
  timeSelection: {
    defaultPrice: number
  }
  date: {
    start: Date | string | undefined
    end: Date | string | undefined
  }
  deselectionPrice: number
  active: boolean
}

export type IEditValues = Partial<IFormValues>
