export interface IState {
  isListVisible: boolean
}

export interface IProps {
  id: string
  label: string
  options: IOption[]
  placeholder: string
  className?: string
  saveAsObject?: boolean
  selectedValue?: string
  onChange: (
    e: { target: { id: string; value: { _id: string; name: string } | string } }
  ) => void
}

export interface IOption {
  _id: string
  name: string
}
