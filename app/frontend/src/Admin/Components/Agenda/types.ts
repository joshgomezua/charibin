import { DIRECTION_TYPE, MODAL_TYPE } from '../../Utils/adminTypes'
import { ITicket } from '../../../Common/Utils/globalTypes'

export interface IProps {
  tickets: ITicket[]
  loading: boolean
  error: boolean
  filters: string[]
  filterFrom: string[]
  filterTo: string[]
  direction: DIRECTION_TYPE | null
  retry: () => void
  openEditModal: (id: string) => void
  openModal: (type: MODAL_TYPE, heading: string, id: string) => void
  changeActiveState: (id: string, checked: boolean) => void
}

export enum DIRECTION {
  DEPARTURE = "departure",
  DESTINATION = "destination"
}
