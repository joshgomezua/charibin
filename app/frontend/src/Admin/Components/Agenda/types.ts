import { MODAL_TYPE } from '../../Utils/adminTypes'
import { ITicket } from '../../../Common/Utils/globalTypes'
import { IPagination } from 'src/Admin/Containers/Tickets/types';

export interface IProps {
  tickets: ITicket[]
  loading: boolean
  error: boolean
  filters: string[]
  filterFrom: string[]
  filterTo: string[]
  pagination: IPagination
  handlePaginationOnChange?: (page: number) => void
  retry: () => void
  openEditModal: (id: string) => void
  openModal: (type: MODAL_TYPE, heading: string, id: string) => void
  changeActiveState: (id: string, checked: boolean) => void
}

export enum DIRECTION {
  DEPARTURE = "departure",
  DESTINATION = "destination"
}
