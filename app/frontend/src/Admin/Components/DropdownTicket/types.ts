export interface IState {
    isListVisible: boolean
  }
  
  export interface IProps {
    id: string
    label: string
    options: IOptionTicket[]
    placeholder: string
    className?: string
    saveAsObject?: boolean
    selectedValue?: string
    onChange: (
      e: { target: { id: string; value: { _id: string; departure: string; destination: string } | string } }
    ) => void
  }
  
  export interface IOptionTicket {
    _id: string
    departure: string
    destination: string
  }
  