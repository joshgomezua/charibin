export interface IProps {
  editSchedule?: IFormValues  /*& { _id: string } */
  isLoading: boolean
  closeModal: () => void
  handleSubmit?: (data: any) => Promise<void>
  handleEditTimeSelection?: (data: IEditValues) => Promise<void>
}

export interface IFormValues {
  timeSelection: {
    defaultPrice?: number
    time1: number
    time2: number
    time3: number
    time4: number
    time5: number
    time6: number
    time7: number
    time8: number
    time9: number
    time10: number
  }
}

export type IEditValues = Partial<IFormValues>
