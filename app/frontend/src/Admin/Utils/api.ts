import * as Types from './apiTypes'
import { SortingRule } from 'react-table'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const logIn = (data: Types.ILoginForm) =>
  axios.post(`${API_URL}/login`, data, {
    headers: { 'Content-type': 'application/json' }
  })

export const addTrip = (data: Types.ITrip, token: string) =>
  axios.post(`${API_URL}/trip`, data, {
    headers: { 'Content-type': 'application/json', token }
  })

export const addCity = (data: Types.ICity, token: string) =>
  axios.post(`${API_URL}/trip`, data, {
    headers: { 'Content-type': 'application/json', token }
})

export const updateCity = (id: string, data: Types.ICity, token: string) =>
  axios.put(`${API_URL}/trip/${id}`, data, {
    headers: { 'Content-type': 'application/json', token }
})

export const getTrips = (page: number, limit: number, token: string) =>
  axios.get(`${API_URL}/trip/${page}/${limit}`, {
    headers: {
      'Content-type': 'application/json',
      token
    }
  })

export const getSingleTrip = (id: string, token: string) =>
  axios.get(`${API_URL}/trip/${id}`, { headers: { token } })

export const deleteTrip = (id: string, token: string) =>
  axios.delete(`${API_URL}/trip/${id}`, {
    headers: { token }
  })

export const updateTrip = (id: string, data: Types.ITrip, token: string) =>
  axios.put(`${API_URL}/trip/${id}`, data, {
    headers: { 'Content-type': 'application/json', token }
  })

export const getTickets = (startDate: string, endDate: string, token: string) =>
  axios.get(`${API_URL}/ticket/${startDate}/${endDate}`, {
    headers: {
      'Content-type': 'application/json',
      token
    }
  })

export const createTicket = (data: Types.ITicket, token: string) =>
  axios.post(`${API_URL}/ticket`, data, {
    headers: {
      'Content-type': 'application/json',
      token
    }
  })

export const editTicket = (
  data: Types.IEditTicket,
  id: string,
  token: string
) =>
  axios.put(`${API_URL}/ticket/${id}`, data, {
    headers: {
      'Content-type': 'application/json',
      token
    }
  })

export const getSingleTicket = (id: string, token: string) =>
  axios.get(`${API_URL}/ticket/${id}`, { headers: { token } })

export const deleteTicket = (id: string, token: string) =>
  axios.delete(`${API_URL}/ticket/${id}`, { headers: { token } })

export const getTripNames = (token: string) =>
  axios.get(`${API_URL}/tripnames`, {
    headers: { token }
  })

export const getOrders = (
  page: number,
  limit: number,
  token: string,
  sortBy?: SortingRule
) => {
  if (sortBy) {
    return axios.get(
      `${API_URL}/order/${page}/${limit}/${sortBy.id}/${
        sortBy.desc ? 'ascending' : 'descending'
      }`,
      {
        headers: { token }
      }
    )
  }

  return axios.get(`${API_URL}/order/${page}/${limit}`, {
    headers: { token }
  })
}

export const editOrderState = (id: string, value: boolean, token: string) =>
  axios.patch(
    `${API_URL}/order/${id}`,
    { sent: value },
    {
      headers: {
        'Content-type': 'application/json',
        token
      }
    }
  )
