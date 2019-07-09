export interface IState {
  date: Date | undefined
  isDatePickerVisible: boolean
}

export interface IProps {
  id: string
  label: string
  placeholder: string
  className?: string
  selectedDate?: Date | undefined
  isRelative?: boolean
  isInTicketModal?: boolean
  onChange: (date: Date) => void
}
