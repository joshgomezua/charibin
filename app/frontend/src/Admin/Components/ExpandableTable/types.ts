import { Column, TableProps } from 'react-table'

export interface IProps {
  data: any
  pages: number
  loading: boolean
  columns: Column[]
  detailsColumns?: Column[]
  subComponentClassName?: string,
  selection: any[]
  className?: string
  handleFetchData: TableProps['onFetchData']
  handleOpenModal: (id: string) => void
  changeTripSelection: (selection: string[]) => void
}

export interface IState {
  selectAll: boolean
}
