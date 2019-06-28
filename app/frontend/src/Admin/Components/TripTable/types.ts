import { Column, TableProps } from 'react-table'

export interface IProps {
  data: any
  pages?: number
  loading?: boolean
  columns?: Column[]
  detailsColumns?: Column[]
  className?: string
  parentTrip: string
  handleFetchData?: TableProps['onFetchData']
  handleOpenModal: (id: string) => void
}
