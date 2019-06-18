import { Column, TableProps } from 'react-table'

export interface IProps {
  data: any
  pages?: number
  loading?: boolean
  columns?: Column[]
  detailsColumns?: Column[]
  className?: string
  handleFetchData?: TableProps['onFetchData']
}
