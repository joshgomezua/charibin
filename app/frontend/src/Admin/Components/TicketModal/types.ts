import { ICity } from '../../Utils/adminTypes'
import { ITicket } from '../../../Common/Utils/globalTypes'

export interface IState {
  isRecurring: boolean
}

export interface IProps {
  isLoading?: boolean
  editDate?: {
    trip: {
      _id: string
      name: string
    }
    type: string
    quantity: number
    availableQuantity: number
    soldTickets: number
    date: {
      start: string
      end: string
    }
    active: boolean
    direction: string
  }
  tripSelected?: { _id: string; name: string } | null
  destinations: ICity[]
  closeModal: () => void
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
    ticket: Pick<ITicket, Exclude<keyof ITicket, 'trip' | '_id' | 'date'>> & {
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
    name: string
  }
  type: string
  quantity: number
  availableQuantity: number
  soldTickets: number
  date: Date | string | undefined
  endDate?: Date | string | undefined
  days?: number[]
  hours?: string
  active: boolean
  direction: string
  isRecurring?: boolean
}
