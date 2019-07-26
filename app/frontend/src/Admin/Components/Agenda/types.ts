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
}

export interface IState {
  header: SORT_STATE
  sortType: SORT_TYPE
  changedSort: boolean
  sortProperty: SORT_PROPERTY
  isReversed: boolean
}

export enum SORT_TYPE {
  NONE = "none",
  DATE = "date",
  TIME_OF_DEPARTURE = "time of departure",
  FROM = "from",
  TO = "to",
  CARRIER = "carrier",
  TYPE = "type",
  SOLD_TICKETS = "sold tickets"
}

export enum SORT_PROPERTY {
  DATE = "date",
  TIME_OF_DEPARTURE = "date",
  FROM = "departure",
  TO = "destination",
  CARRIER = "carrier",
  TYPE = "type",
  SOLD_TICKETS = "soldTickets"
}

export enum SORT_STATE {
  DEFAULT = 'spon-agenda__cell spon-agenda__cell--head',
  BOT = 'spon-agenda__cell spon-agenda__cell--head-border-bot',
  TOP = 'spon-agenda__cell spon-agenda__cell--head-border-top',
}

