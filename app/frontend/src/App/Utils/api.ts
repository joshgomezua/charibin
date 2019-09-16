import axios from 'axios'
import { IBookedData, IUnbookedData, ISupportData, IBuyData } from './apiTypes'

const API_URL = process.env.REACT_APP_API_URL
const TIMEZONE_OFFSET = (new Date()).getTimezoneOffset() * 60000

export const getTrips = (
  page: number,
  limit: number,
  priceStart: number,
  priceEnd: number,
  dateStart: number,
  dateEnd: number,
  adult: number,
  youth: number,
  departure: string,
) => 
  axios.get(
    `${API_URL}/dashboard/ticket/${page}/${limit}/${priceStart}/${priceEnd}/${dateStart}/${dateEnd}/${adult}/${youth}/${departure?departure:"No_departure_found"}/${TIMEZONE_OFFSET}`
  )


export const getTickets = (date: number, page: number, limit: number) =>
  axios.get(`${API_URL}/ticket/${page}/${limit}/${date}`)

export const getTripsDepartureNames = (token: string) =>
  axios.get(`${API_URL}/tripDeparturenames/${TIMEZONE_OFFSET}`, {
    headers: { token }
  })

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
