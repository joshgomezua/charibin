import {ICity} from '../../../Admin/Utils/adminTypes';
import { MODAL_TYPE } from 'src/Admin/Utils/adminTypes';
import { IResponseError } from '../../../Common/Utils/globalTypes'

export interface IState {
    cities: ICity[];
    filteredData: ICity[];
    total: number
    isModalLoading: boolean
    isLoading: boolean
    currentPage: number
    editData: ICity
    modal: {
      id: string
      type: MODAL_TYPE | null
      heading: string
    }
}


export interface IProps {
    showError: (err: IResponseError, defaultText?: string) => void
    showSuccess: (msg: string) => void
  }