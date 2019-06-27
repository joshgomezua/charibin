import { ITicket } from '../../../Common/Utils/globalTypes'
import { IOptionTicket } from '../DropdownTicket/types';

export interface IState {
  isRecurring: boolean
}

export interface IProps {
  isLoading?: boolean
  editDate?: {
    trip: {
      _id: string
      departure: string
      destination: string
    }
    departure: string
    destination: string
    soldTickets: number,
    reservedQuantity: number,
    type: string
    quantity: number
    date: {
      start: string
      end: string
    }
    active: boolean
  }
  tripSelected?: { _id: string; departure: string, destination: string } | null
  departures: IOptionTicket[]
  destinations: IOptionTicket[]
  closeModal: () => void
  handleSelectDeparture: (departure: string) => void
  handleSubmit?: (
    ticket: Pick<ITicket, Exclude<keyof ITicket, 'trip' | '_id' | 'date'>> & {
      trip: string
      date: {
        start: number
        end: number
      }
      repeat?: {
        dateEnd: number
        days: number[]
      }
    }
  ) => Promise<void>
  handleEditTicket?: (
    ticket: Pick<ITicket, Exclude<keyof ITicket, 'trip' | '_id' | 'date' | 'soldTickets' | 'reservedQuantity'>> & {
      trip: string
      date: {
        start: number
        end: number
      }
    }
  ) => Promise<void>
}

export interface IFormValues {
  trip: {
    _id: string
    departure: string,
    destination: string
  }
  type: string
  quantity: number
  departure: string
  destination: string
  soldTickets: number,
  reservedQuantity: number,
  date: Date | string | undefined
  endDate?: Date | string | undefined
  days?: number[]
  hours?: string
  active: boolean
  isRecurring?: boolean
}