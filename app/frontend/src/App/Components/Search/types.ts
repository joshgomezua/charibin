export interface IProps {
  initialValue?: string
  quantity: number
  setQuantity?: (quantity: number) => void
  onSubmit: (e: any) => void
}

export interface IState {
  inputValue: string
  buttons: boolean
}
