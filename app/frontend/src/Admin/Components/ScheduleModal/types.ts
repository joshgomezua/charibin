import { INewSchedule } from "src/Admin/Containers/Trips/types";

export interface IProps {
  editDate?: IFormValues & { _id: string }
  isLoading: boolean
  closeModal: () => void
  handleSubmit?: (data: Pick<INewSchedule, Exclude<keyof INewSchedule, 
      'trip' | '_id' | 'date' >>) => Promise<void>
  handleEditSchedule?: (data: Pick<INewSchedule, Exclude<keyof INewSchedule, 
      'trip' | '_id' | 'date' >>) => Promise<void>
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
