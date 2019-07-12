import * as Types from './apiTypes'
import { SortingRule } from 'react-table'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL


export const logIn = (data: Types.ILoginForm) =>
  axios.post(`${API_URL}/login`, data, {
    headers: { 'Content-type': 'application/json' }
  })

  export const resetUserPassword = (id: string, token: string) =>
  axios.post(
    `${API_URL}/user/${id}`,
    
    {
      headers: {
        'Content-type': 'application/json',
        token
      }
    }
  )


export const addUser = (data: Types.IUser, token: string) =>
    axios.post(`${API_URL}/user`, data, {
      headers: { 'Content-type': 'application/json', token }
    })

export const getUsers = (page: number, limit: number, token: string) =>
  axios.get(`${API_URL}/user/${page}/${limit}`, {
    headers: {
      'Content-type': 'application/json',
      token
    }
  })
  export const editUserState = (id: string, value: boolean, token: string) =>
  axios.put(
    `${API_URL}/user/${id}`,
    { active: value },
    {
      headers: {
        'Content-type': 'application/json',
        token
      }
    }
  )


export const getSingleUser = (id: string, token: string) =>
  axios.get(`${API_URL}/user/${id}`, { headers: { token } })

export const deleteUser = (id: string, value: boolean, token: string) =>
axios.put(
  `${API_URL}/user/${id}`,
  { isDeleted: value },
  {
    headers: {
      'Content-type': 'application/json',
      token
    }
  }
)


export const updateUser = (id: string, data: Types.IEditUser, token: string) =>
  axios.put(`${API_URL}/user/${id}`, data, {

    headers: { 'Content-type': 'application/json', token }
  })




export const addTrip = (data: Types.INewTrip, token: string) =>

  axios.post(`${API_URL}/trip`, data, {
      headers: { 'Content-type': 'application/json', token }
})

export const getTrips = (
  page: number, 
  limit: number, 
  token: string,
  sortBy?: SortingRule
  ) => {
  if(sortBy){
    return axios.get(
      `${API_URL}/trip/${page}/${limit}/${sortBy.id}/${
        sortBy.desc ? 'ascending' : 'descending'
      }`,
      {
        headers: { token }
      }
    )
  }
  return axios.get(`${API_URL}/trip/${page}/${limit}`, {
    headers: { token }
  })
}

export const getSingleTrip = (id: string, token: string) =>
  axios.get(`${API_URL}/trip/${id}`, { headers: { token } 
})

export const deleteTrip = (id: string, token: string) =>
  axios.delete(`${API_URL}/trip/${id}`, {
    headers: { token }
  })

export const updateTrip = (id: string, data: Types.INewTrip, token: string) =>
  axios.put(`${API_URL}/trip/${id}`, data, {
    headers: { 'Content-type': 'application/json', token }
  })

export const updateTimeSelection = (id: string, data: Types.IEditTimeSelect, token: string) =>
  axios.put(`${API_URL}/trip/${id}`, data, {
    headers: { 'Content-type': 'application/json', token }
  })

  export const addSchedule = (data: Types.INewScheduledTrip, token: string) => 
  axios.post(`${API_URL}/scheduledTrip`, data, {
      headers: { 'Content-type': 'application/json', token }
})

export const updateSchedule = (id: string, data: Types.INewScheduledTrip, token: string) =>
  axios.put(`${API_URL}/scheduledTrip/${id}`, data, {
    headers: { 'Content-type': 'application/json', token }
  })

export const deleteScheduledTrip = (id: string, token: string) =>
  axios.delete(`${API_URL}/scheduledTrip/${id}`, {
    headers: { token }
  })

export const getSingleScheduledTrip = (id: string, token: string) =>
  axios.get(`${API_URL}/scheduledTrip/${id}`, { headers: { token } 
})

export const getOpposites = (id: string, token: string) =>
  axios.get(`${API_URL}/opposites/${id}`, { headers: { token } 
})

export const getTickets = (startDate: string, endDate: string, from: string, to: string, carrier: string, page: number, limit: number, token: string) =>
  axios.get(`${API_URL}/ticket/${startDate}/${endDate}/${from}/${to}/${carrier}/${page}/${limit}`, {
    headers: {
      'Content-type': 'application/json',
      token
    }
  })

export const getTicketsQty = (token: string) => 
  axios.get(`${API_URL}/ticketQuantity`, {
    headers : { 
      'Content-type': 'application/json',
      token 
    }
  })
  

export const getDestinationTicketsQty = (departure: string, destination: string, token: string) => {
  return axios.get(`${API_URL}/ticket/destination/quantity/${departure}/${destination}`, {
    headers: {
      'Content-type': 'application/json',
      token
    }
  })
}

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
  export const addCity = (data: Types.ICity, token: string) => 
  axios.post(`${API_URL}/city`, data, {
    headers: { 'Content-type': 'application/json', token }
})

export const updateCity = (id: string, data: Types.ICity, token: string) =>
  axios.put(`${API_URL}/city/${id}`, data, {
    headers: { 'Content-type': 'application/json', token }
  }
)

export const getCities = (
  page: number, 
  limit: number, 
  token: string, 
  sortBy?: SortingRule
) => {
  if (sortBy) {
    return axios.get(
      `${API_URL}/city/${page}/${limit}/${sortBy.id}/${
        sortBy.desc ? 'ascending' : 'descending'
      }`,
      {
        headers: { token }
      }
    )
  }
  
  return axios.get(`${API_URL}/city/${page}/${limit}`, {
    headers: {
      token
    }
  })
}

export const searchCity = (name: string,page:number, limit: number,token: string) => 
  axios.get(`${API_URL}/city/${page}/${limit}/${name}`, {
    headers: {
      'Content-type': 'application/json',
      token
    }
  }
)

export const getSingleCity = (id: string, token: string) =>
  axios.get(`${API_URL}/city/${id}`, { headers: { token } }
)

export const deleteCity = (id: string, token: string) =>
  axios.delete(`${API_URL}/city/${id}`, {
    headers: { token }
  }
)

export const editCityState = (id: string, value: boolean, token: string) =>
  axios.patch(
    `${API_URL}/city/${id}`,
    { isEnabled: value },
    {
      headers: {
        'Content-type': 'application/json',
        token
      }
    }
)

