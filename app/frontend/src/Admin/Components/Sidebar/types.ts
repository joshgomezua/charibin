export interface IProps {
  filterFrom: string[]
  filterTo: string[]
  filterCarrier: string[]
  selectedDate: Date
  calendarFilter:{
    start: Date | undefined
    end: Date | undefined
  }
  changeFilterFrom: (filterFrom: string[]) => void
  changeFilterTo: (filterTo: string[]) => void
  changeFilterCarrier: (filterCarrier: string[]) => void
  changeSelectedDate: (date: Date) => void
  onChange?: (v: [Date, Date]) => void
  handleFetchTicketsByDate: () => void
}

export interface IState {
  calendarVisible: boolean
  selectedColor: string
  filtersFrom: ITerritory[]
  filtersTo: ITerritory[]
  filtersCarrier: ICarrier[]
}

export interface ITerritory {
  value: number
  label: string
  country: string
}

export interface ICarrier {
  value: number
  label: string
}

export enum COLOR {
  BLUE = 'blue',
  GREEN = 'green'
}
