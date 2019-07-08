import { MODAL_TYPE } from '../../Utils/adminTypes'

export interface IProps {
  title: string
  filterFrom: string[]
  filterTo: string[]
  heading?: string
  modal?: MODAL_TYPE
  query?: string
  handleOpenModal?: (type: MODAL_TYPE, heading: string) => void,
  changeFilterFrom: (filterFrom: string[]) => void
  changeFilterTo: (filterTo: string[]) => void
}

export interface IState {
  selectedColor: string
}

export enum COLOR {
  BLUE = 'blue',
  GREEN = 'green'
}

export interface ITerritory {
  value: number
  label: string
  country: string
}
