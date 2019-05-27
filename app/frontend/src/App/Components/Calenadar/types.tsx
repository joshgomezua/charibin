export interface IProps {
  onChange?: (v: [Date, Date]) => void
  value?: [Date, Date]
  startDates?: string[]
  endDates?: string[]
  selectRange?: boolean
}

export interface IState {
  startDate: Date
  startFillingEndRange: boolean
}
