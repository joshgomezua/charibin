import { Column, TableProps } from 'react-table'

export interface IProps {
  data: any
  pages: number
  loading: boolean
  columns: Column[]
  detailsColumns?: Column[]
  subComponentClassName?: string,
  className?: string
  handleFetchData: TableProps['onFetchData']
  handleOpenModal: (id: string) => void
}

export interface IState {
  selectAll: boolean
}
