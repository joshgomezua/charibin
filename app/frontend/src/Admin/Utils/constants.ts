export enum ADMIN_ROUTING {
  MAIN = '/admin',
  LOGIN = '/login',
  TRIPS = '/trips',
  TICKETS = '/tickets',
  ORDERS = '/orders',
  USERS = '/users'
}

export const ERRORS = {
  TRIP_FETCH: `Cant't fetch trip list`,
  TRIP_DELETE: 'Error when delete trip ',
  TRIP_ADD: 'Error when submit form',
  TRIP_EDIT: 'Error when edit trip',
  TICKET_ADD: 'Error when add ticket',
  TICKET_FETCH: `Can't fetch tickets list`,
  TICKET_DELETE: 'Error when delete ticket',
  TICKET_EDIT: 'Error when edit ticket',
  ORDERS_FETCH: `Can't fetch orders list`,
  ORDERS_EDIT: 'Error when edit order',
  USER_FETCH: `Cant't fetch user list`,
  USER_ADD: 'Error when add user' ,
  USER_EDIT: 'Error when edit user',
  USER_DELETE: 'Error when delete user',
  DEFAULT: 'Error'
}

export const SUCCESS = {
  TRIP_ADD: 'Trip added successfully',
  TRIP_EDIT: 'Trip edited successfully',
  TRIP_DELETE: 'Trip deleted successfully',
  TICKET_ADD: 'Ticket added successfully',
  TICKET_EDIT: 'Trip edited successfully',
  TICKET_DELETE: 'Ticket deleted successfully',
  ORDER_UPDATE: 'Order update successfully',
  USER_ADD: 'user added successfully' ,
  USER_EDIT: 'user edited successfully' ,
  USER_DELETE: 'User deleted succesfully',
  USER_UPDATE: 'user updated successfully' ,
  DEFAULT: 'Success'
}

export const DEFULT_TICKET_DATA = {
  _id: '',
  trip: { _id: '', name: '' },
  direction: '',
  quantity: 0,
  type: '',
  date: {
    start: '',
    end: ''
  },
  active: false
}

export const DEFAULT_TRIP_DATA = {
  _id: '',
  active: false,
  deselectionPrice: 0,
  discount: 0,
  duration: 0,
  fake: false,
  name: '',
  photo: '',
  price: 0,
  type: ''
}

export const DEFAULT_USER_DATA = {
  _id: '',
  active: false,
  email: '-key@hotmail.com',
  name: '',
  role: '',
  password: ''
}
