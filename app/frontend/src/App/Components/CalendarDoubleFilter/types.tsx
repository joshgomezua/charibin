export interface IProps {
    onChange?: (v: [Date, Date]) => void
    changeSelectedDate: (date: Date) => void
    handleChangeDate: (date: Date) => void
    clearCalendar: () => void
    value?: [Date, Date]
    startDates?: string[]
    endDates?: string[]
    selectRange?: boolean
    selectedDate: Date
  }
  
  export interface IState {
    startDate: Date
    startFillingEndRange: boolean
    rangeIsDisplayed: boolean
  }
  