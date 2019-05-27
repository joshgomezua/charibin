import { IError } from '../../Common/Utils/globalTypes'

export const isErrorMessage = (err: IError) => {
  if (err.data && err.data.message) {
    return true
  }

  return false
}

export const isStatusText = (err: IError) => {
  if (err.statusText) {
    return true
  }

  return false
}

export const getToken = () => {
  const userData = getUserData()

  if (userData) {
    return userData.token
  }

  return false
}

export const getUserData = () => {
  const stored = localStorage.getItem('userData')

  if (stored) {
    const rehydrated = JSON.parse(stored)
    return rehydrated
  }

  return false
}

export const getOwnerToken = () => {
  const stored = localStorage.getItem('owner')

  if (stored) {
    const rehydrated = JSON.parse(stored)
    return rehydrated.token
  }

  return false
}

export const getFromLS = (name: string) => {
  const stored = localStorage.getItem(name)

  if (stored) {
    const rehydrated = JSON.parse(stored)
    return rehydrated
  }

  return false
}

export const saveToLS = (name: string, data: any) => {
  localStorage.setItem(name, JSON.stringify(data))
}

export const removeFromLS = (name: string) => {
  localStorage.removeItem(name)
}
