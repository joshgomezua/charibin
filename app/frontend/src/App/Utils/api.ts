import axios from 'axios'
import { IBookedData, IUnbookedData, ISupportData, IBuyData } from './apiTypes'

const API_URL = process.env.REACT_APP_API_URL

export const getTrips = (
  page: number,
  limit: number,
  priceStart: number,
  priceEnd: number,
  dateStart: number,
  dateEnd: number,
  quantity: number,
  inSelect: boolean
) =>
  axios.get(
    `${API_URL}/dashboard/ticket/${page}/${limit}/${priceStart}/${priceEnd}/${dateStart}/${dateEnd}/${quantity}/${inSelect}`
  )

export const bookTrips = (data: IBookedData) =>
  axios.post(`${API_URL}/ticket/book`, data, {
    headers: {
      'Content-type': 'application/json'
    }
  })

export const unbookTrips = (data: IUnbookedData) =>
  axios.post(`${API_URL}/ticket/unbook`, data, {
    headers: {
      'Content-type': 'application/json'
    }
  })

export const support = (data: ISupportData) =>
  axios.post(`${API_URL}/support`, data, {
    headers: {
      'Content-type': 'application/json'
    }
  })

export const buyTickets = (data: IBuyData) =>
  axios.post(`${API_URL}/ticket/buy`, data, {
    headers: {
      'Content-type': 'application/json'
    }
  })
