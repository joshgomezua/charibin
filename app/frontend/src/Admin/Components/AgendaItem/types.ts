import { MODAL_TYPE } from '../../Utils/adminTypes'
import { ITicket } from '../../../Common/Utils/globalTypes'

export interface IProps {
  ticket: ITicket
  index: number
  rowSpan: number
  changeActiveState: (id: string, checkend: boolean) => void
  openTicket: (id: string) => void
  openModal: (type: MODAL_TYPE, heading: string, id: string) => void
}
