import { ISelectedData } from '../../Utils/appTypes'

export interface IProps {
  isMax: boolean
  selected: ISelectedData[]
  deselected?: ISelectedData[]
  step: number
  max: number
  onNext?: (e: any) => void
  onBack?: (e: any) => void
  onEdit?: (e: any) => void
  isEdit?: boolean
}
