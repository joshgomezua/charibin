export interface IProps {
  isLoading?: boolean
  disabled?: boolean
  text?: string
  icon?: 'plus' | 'cross' | 'crossWhite' | 'arrowRight' | 'arrowLeft' | 'trash'|'pencil'|'undo' | 'arrowLeftUpdated'
  className?: string
  type?: 'button' | 'submit'
  variant?:
    | 'blue'
    | 'blue-select'
    | 'white'
    | 'gray'
    | 'red'
    | 'green'
    | 'next'
    | 'prev'
    | 'adminPrimary'
    | 'adminSecondary'
  onClick?: (e: any) => void
}
