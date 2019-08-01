
export interface IState {
    isListVisible: boolean
  }
  
  export interface IProps {
    id: string
    label: string
    input: string
    options: IOptionTicket[]
    placeholder: string
    className?: string
    saveAsObject?: boolean
    selectedValue?: string
    onChange: (
      e: { target: { id: string; value: { _id: string; departure: string; destination: string, carrier: string, type: string } | string } }
    ) => void
    onSelectDeparture?: (departure: string) => void
    onSelectDestination?: (destination: string) => void
    onSelectCarrier?: (carrier: string) => void
  }
   
  export interface IOptionTicket {
    _id: string
    departure: string
    destination: string
    carrier: string
    type: string
  }
  