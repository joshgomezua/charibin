import { MODAL_TYPE } from '../../Utils/adminTypes'

export interface IProps {
  title: string
  query?: string
  handleSearch?: (query: string) => void
  handleOpenModal?: (type: MODAL_TYPE, heading: string) => void
}
