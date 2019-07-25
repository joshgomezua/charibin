import { MODAL_TYPE } from '../../Utils/adminTypes'

export interface IProps {
  title: string
  filterFrom: string[]
  filterTo: string[]
  availableDepartures: string[]
  availableDestinations: string[]
  heading?: string
  modal?: MODAL_TYPE
  query?: string
  handleOpenModal?: (type: MODAL_TYPE, heading: string) => void,
  changeFilterFrom: (filterFrom: string[]) => void
  changeFilterTo: (filterTo: string[]) => void
}

export interface IState {
  selectedColor: string
  filterToTemp: string[]
  option: IOptions
}

export enum COLOR {
  VIOLET = '#5556dc',
}

export interface ITerritory {
  value: number
  label: string
}

export interface IOptions {
  item: any
  itemIndex: any
  props: any
  state: any 
  methods: any
}

export interface IOption {
  item: any
  props: any
  state: any 
  methods: any
}