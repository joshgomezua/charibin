import { Column, TableProps } from 'react-table'
// import { MODAL_TYPE } from 'src/Admin/Utils/adminTypes';

export interface IProps {
  data: any
  pages?: number
  loading?: boolean
  columns?: Column[]
  detailsColumns?: Column[]
  className?: string
  handleFetchData?: TableProps['onFetchData']
  // handleOpenModal?: (type: MODAL_TYPE, heading: string) => void
}
