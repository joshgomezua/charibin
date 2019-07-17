
export enum ADMIN_ROUTING {
  MAIN = '/admin',
  LOGIN = '/login',
  TRIPS = '/trips',
  TICKETS = '/tickets',
  ORDERS = '/orders',
  CITIES = '/cities',
  USERS = '/users'

}

export const ERRORS = {
  TRIP_FETCH: `Cant't fetch trip list`,
  TRIP_DELETE: 'Error when delete trip ',
  TRIP_ADD: 'Error when submit form',
  TRIP_EDIT: 'Error when edit trip',
  TICKET_ADD: 'Error when add ticket',
  TICKET_FETCH: `Can't fetch tickets list`,
  TICKET_FETCH_QUANTITY: `Can't fetch tickets quantity`,
  TICKET_DELETE: 'Error when delete ticket',
  TICKET_EDIT: 'Error when edit ticket',
  CITY_FETCH: `Cant't fetch city list`,
  CITY_DELETE: 'Error when delete city ',
  CITY_ADD: 'Error when submit form',
  CITY_EDIT: 'Error when edit city',
  ORDERS_FETCH: `Can't fetch orders list`,
  ORDERS_EDIT: 'Error when edit order',
  USER_FETCH: `Cant't fetch user list`,
  USER_ADD: 'Error when add user' ,
  USER_EDIT: 'Error when edit user',
  USER_DELETE: 'Error when delete user',
  USER_UPDATE: 'Error when update user',
  USER_RESET: 'Error when reset user password',

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
  CITY_ADD: 'City added successfully',
  CITY_EDIT: 'City updated successfully',
  CITY_DELETE: 'City deleted successfully',
  CITY_UPDATE: 'city update successfully',
  USER_ADD: 'user added successfully' ,
  USER_EDIT: 'user edited successfully' ,
  USER_DELETE: 'User deleted succesfully',
  USER_UPDATE: 'user updated successfully' ,
  USER_RESET: 'User password reset successfully',
  DEFAULT: 'Success'
}

export const DEFAULT_TICKET_DATA = {
  _id: '',
  trip: { _id: '', departure: '', destination: '', carrier: '', duration: 0 },
  quantity: 0,
  soldTickets: 0,
  reservedQuantity: 0,
  destination: '',
  departure: '',
  type: '',
  date: {
    start: '',
    end: ''
  },
  active: false
}

export const DEFAULT_CITY_DATA = {
  _id: '',
  name: 'London',
  country: 'United Kingdom',
  tags: ["beach"],
  photo: ''
}

export const DEFAULT_TRIP_SCHEDULE = {
  _id: '',
  active: false,
  deselectionPrice: 0,
  date: {
    start: '',
    end: '',
  },
  timeSelection: {
    defaultPrice: 0,
    _0to6AM: 0,
    _6to8AM: 0,
    _8to10AM: 0,
    _10to12PM: 0,
    _12to2PM: 0,
    _2to4PM: 0,
    _4to6PM: 0,
    _6to8PM: 0,
    _8to10PM: 0,
    _10to12AM: 0,
  },
  discount: 0,
  duration: 0,
  price: 0,
  trip: ''
}

export const DEFAULT_TRIP_DATA = {
  _id: '',
  active: false,
  deselectionPrice: 0,
  timeSelection: {
    defaultPrice: 0,
    _0to6AM: 0,
    _6to8AM: 0,
    _8to10AM: 0,
    _10to12PM: 0,
    _12to2PM: 0,
    _2to4PM: 0,
    _4to6PM: 0,
    _6to8PM: 0,
    _8to10PM: 0,
    _10to12AM: 0,
  },
  scheduledTrips: [DEFAULT_TRIP_SCHEDULE],
  discount: 0,
  duration: 0,
  fake: false,
  departure: DEFAULT_CITY_DATA,
  destination: DEFAULT_CITY_DATA,
  carrier: '',
  photo: '',
  price: 0,
  type: ''
}


export const TAGS = [
  'City','Beach','Nightlife','Art & Culture','Family',
  'Nature',
  'History'
]


export const COUNTRIES = [
  { _id: "0",
    name:"Albania"
  },
  {
    _id: "1",
    name:"Andorra"
  },
  {
    _id: "2",
    name:"Armenia"

  },
  {
    _id: "3",
    name: "Austria" 
  },
  {
    _id: "4",
    name: "Azerbaijan"
  },
  {
    _id: "5",
    name: "Belarus"
  },
  {
    _id: "6",
    name: "Belgium"
  },
  {
    _id: "7",
    name: "Bosnia and Herzegovina"
  },
  {
    _id: "8",
    name: "Bulgaria"
  }, 
  {
    _id: "11",
    name: "Canada"
  },
  {
    _id: "9",
    name: "Croatia"
  },
  {
    _id: "10",
    name: "Cyprus"
  },
  {
    _id: "12",
    name: "Denmark"
  },
  {
    _id: "13",
    name: "Estonia"
  },
  {
    _id: "14",
    name: "Finland"
  },
  {
    _id: "15",
    name: "France"
  },
  {
    _id: "17",
    name: "Georgia"
  },
  {
    _id: "18",
    name: "Germany"
  },
  {
    _id: "19",
    name: "Greece"
  },
  {
    _id: "20",
    name: "Hungary"
  },
  {
    _id: "21",
    name: "Iceland"
  },
  {
    _id: "22",
    name: "Ireland"
  },
  {
    _id: "23",
    name: "Italy"
  },
  {
    _id: "24",
    name:"Kazakhstan"
  },
  {
    _id: "25",
    name: "Kosovo"
  },
  {
    _id: "26",
    name: "Latvia"
  },
  {
    _id:"27",
    name:"Liechtenstein"
  },
  {
    _id:"28",
    name:"Lithuania"
  },
  {
    _id: "29",
    name: "Luxembourg"
  },
  {
    _id: "30",
    name: "Malta"
  },
  {
    _id: "31",
    name: "Mexico"
  },
  {
    _id: "32",
    name: "Moldova"
  },
  {
    _id: "33",
    name: "Monaco"
  },
  {
    _id: "34",
    name:"Montenegro"
  },
  {
    _id: "35",
    name: "Netherlands"
  },
  {
    _id: "36",
    name: "North Macedonia"
  },
  {
    _id: "37",
    name: "Norway"
  },
  {
    _id: "38",
    name: "Poland"
  },
  {
    _id: "39",
    name: "Portugal"
  },
  {
    _id: "40",
    name: "Romania"
  },
  {
    _id: "41",
    name: "Russia"
  },
  {
    _id: "42",
    name: "San Marino"
  },
  {
    _id: "43",
    name: "Serbia"
  },  
  {
    _id: "44",
    name: "Slovakia"
  },
  {
    _id: "45",
    name: "Slovenia"
  },
  {
    _id: "46",
    name: "Spain"
  },
  {
    _id: "47",
    name: "Sweden"
  },
  {
    _id: "48",
    name: "Ukraine"
  },
  {
    _id: "49",
    name: "United Kingdom (UK)"
  },
  {
    _id: "50",
    name:"United States (USA)"
  },
  {
    _id: "51",
    name: "Switzerland"
  },
  {
    _id: "52",
    name:"Turkey"
  },
  {
    _id: "53",
    name:"Vatican City"
  },
  
]

export const DEFAULT_SEARCH_RESULT = {
  _id: '',
  name: 'No data found'
}


export const DEFAULT_USER_DATA = {
  _id: '',
  active: true,
  email: '',
  name: '',
  role: '',
  password: '',
  isDeleted: false
}

