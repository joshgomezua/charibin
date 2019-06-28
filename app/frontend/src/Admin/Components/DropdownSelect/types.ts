export interface IState {
    isListVisible: boolean
    inputValue: string|undefined
    results: IOption[]
  }
  
  export interface IProps {
    id: string
    label: string
    options: IOption[]
    placeholder: string
    className?: string
    selectedValue?: string
    onChange: (
      e: { target: { id: string; value: { _id: string; name: string } | string } }
    ) => void
  }
  
  export interface IOption {
    _id: string
    name: string
  }