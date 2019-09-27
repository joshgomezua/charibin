export interface IState {
  isListVisible: boolean
}

export interface IProps {
  id: string
  label: string | JSX.Element
  options: IOption[]
  placeholder: string
  className?: string
  selectedValue?: IOption
  withFormik?: boolean
  onChange: (
    data:
      | { id: string; value: IOption }
      | { target: { id: string; value: IOption } }
  ) => void
}

export interface IOption {
  id: string
  name: string
  isDisabled?: boolean
}
