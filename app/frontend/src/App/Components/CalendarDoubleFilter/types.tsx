export interface IProps {
    onChange?: (v: [Date, Date]) => void
    changeSelectedDate: (date: Date) => void
    handleChangeDate: (date: Date) => void
    value?: [Date, Date]
    startDates?: string[]
    endDates?: string[]
    selectRange?: boolean
    selectedDate: Date
  }
  
  export interface IState {
    startDate: Date
    startFillingEndRange: boolean
  }
  