import moment from 'moment'

export const calculateTimeDiff = (date: Date | string) => {
  const diff = moment.utc().diff(date)
  const fiveteenMinInMs = 1000 * 20//900000
  const timeRemaining = fiveteenMinInMs - diff

  if (diff < fiveteenMinInMs) {
    return `${moment.utc(timeRemaining).format('HH:mm:ss')}`
  }

  return false
}
