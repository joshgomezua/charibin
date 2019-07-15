export interface IProps {
  filterFrom: string[]
  filterTo: string[]
  selectedDate: Date
  calendarFilter:{
    start: Date | undefined
    end: Date | undefined
  }
  changeFilterFrom: (filterFrom: string[]) => void
  changeFilterTo: (filterTo: string[]) => void
  changeSelectedDate: (date: Date) => void
  onChange?: (v: [Date, Date]) => void
  handleFetchTicketsByDate: () => void
}

export interface IState {
  calendarVisible: boolean
  selectedColor: string
}

export interface ITerritory {
  value: number
  label: string
  country: string
}

export enum COLOR {
  BLUE = 'blue',
  GREEN = 'green'
}
