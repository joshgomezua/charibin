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
  handlePaginationClick: (page: number) => void
  retry: () => void
  openEditModal: (id: string) => void
  openModal: (type: MODAL_TYPE, heading: string, id: string) => void
  changeActiveState: (id: string, checked: boolean) => void
  filterString: (filter: string) => void
  filterNumber: (filter: string) => void
  filterDate: (filter: string, isDate: boolean) => void
}

export interface IState {
  header: SORT_STATE
  filterType: FILTER_TYPE
  changedSort: boolean
}

export enum DIRECTION {
  DEPARTURE = "departure",
  DESTINATION = "destination"
}

export enum FILTER_TYPE {
  DATE = "date",
  TIME_OF_DEPARTURE = "time of departure",
  FROM = "from",
  TO = "to",
  CARRIER = "carrier",
  TYPE = "type",
  SOLD_TICKETS = "sold tickets"
}

export enum SORT_STATE {
  DEFAULT = 'spon-agenda__cell spon-agenda__cell--head',
  BOT = 'spon-agenda__cell spon-agenda__cell--head-border-bot',
  TOP = 'spon-agenda__cell spon-agenda__cell--head-border-top',
}
