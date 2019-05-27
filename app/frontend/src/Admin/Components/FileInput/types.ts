export interface IProps {
  label?: string
  handleChange: (e: { target: { id: string; value: string } }) => void
  handleSetError: (name: string, msg: string) => void
}

export interface IState {
  name: string
}
