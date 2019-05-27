export interface IProps {
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  htmlType?: 'submit' | 'button'
  onClick?: () => void
}
