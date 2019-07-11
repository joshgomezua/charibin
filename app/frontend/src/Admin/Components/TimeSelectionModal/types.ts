export interface IProps {
  editSchedule?: IFormValues
  isLoading: boolean
  isASchedule: boolean
  closeModal: () => void
  handleSubmit?: (data: any) => Promise<void>
  handleEditTimeSelection?: (data: IEditValues) => Promise<void>
}

export interface IFormValues {
  timeSelection: {
    defaultPrice?: number
    _0to6AM: number
    _6to8AM: number
    _8to10AM: number
    _10to12PM: number
    _12to2PM: number
    _2to4PM: number
    _4to6PM: number
    _6to8PM: number
    _8to10PM: number
    _10to12AM: number
  }
  bidirectionalChange?: boolean
}

export type IEditValues = Partial<IFormValues>
