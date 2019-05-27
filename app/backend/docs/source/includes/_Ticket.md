#Ticket

## Create ticket
```javascript
const data = JSON.stringify({
  direction: 'arrival',
  quantity: 19,
  type: 'Train',
  date: { start: 1546512946963, end: 1546512946963 },
  trip: '5c2dea327b1af914d0dd9470'
})
const req = new XMLHttpRequest()
req.open('POST', `http://localhost:3000/ticket`)
req.setRequestHeader('Content-type', 'application/json')
req.onload = () => {
  if (req.status === 201) {
    console.log(JSON.parse(req.response))
  } else {
    throw req.response
  }
}
req.send(data)
```

<aside>If u are creating tickets using recurring function then response will be different</aside>

> The above command returns JSON structured like this:

```json
// for normal create
{
  "active": true,
  "_id": "5c2dea327b1af914d0dd9472",
  "direction": "arrival",
  "quantity": 19,
  "type": "Train",
  "date": {
    "start": "2019-01-03T10:55:46.965Z",
    "end": "2019-01-03T10:55:46.965Z"
  },
  "update": false,
  "trip": "5c2dea327b1af914d0dd9470",
  "blockedQuantity": [],
  "createdAt": "2019-01-03T10:55:46.985Z",
  "__v": 0
}

// for recurring
{
  "update": true,
  "dates": [
    1547064329128,
    1549064329128
  ]
}

// for recurring without any update
{
  // Just empty object
}
```

### HTTP Request
`POST http://localhost:3000/ticket`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
404 | Trip not exist


### Query Parameters
Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
trip | true | String | ID of trip
direction | true | String | Should satisfy [direction regex](#directionRegex)
quantity | true | Number | Range: 1 - 1000
type | true | String | Should satisfy [Type regex](#typeRegex)
date.start | true | Timestamp |
date.end | true | Timestamp |
active | false | Boolean | Default: `true`
blockedQuantity | false | Array | Read only
createdAt | false | Date | Read only
repeat.dateEnd | false | Timestamp. Only for recurring
repeat.days | false | Array |  Only for recurring. Example (all days in week): `[0, 1, 2, 3, 4, 5, 6 ]`. Max size: 7. Range: 0 - 6



## Buy trip
```javascript
const data = JSON.stringify({
  owner: '5fb95ee1daa39e40871ce6bd37d61cdb8a5843a1f06ac8d1e2b88f5952c1906dab82380c861b5f6b',
  creditCardToken: 'tok_visa',
  buyerInfo: {
    email: 'Jalon.Bogan@example.net',
    firstName: 'Kirsten',
    middleName: 'Hershel',
    lastName: 'Ruecker',
    birthDate: '1538990050517',
    phone: '247-477-6794',
    address: '09437 Beer Squares',
    city: 'Port Laney',
    zipCode: '08527'
  }
 })
const req = new XMLHttpRequest()
req.open('POST', `http://localhost:3000/ticket/buy`)
req.setRequestHeader('Content-type', 'application/json')
req.onload = () => {
  if (req.status === 200) {
    console.log(JSON.parse(req.response))
  } else {
    throw req.response
  }
}
req.send(data)
```

> The above command returns JSON structured like this:

```json
{
  "name": "Hyattmouth",
  "arrivalTicket": {
    "_id": "5c4f0f13b402210dfa442843",
    "date": {
      "start": "2020-01-02T09:00:00.000Z",
      "end": "2020-01-02T12:00:00.000Z"
    },
    "type": "Train"
  },
  "departureTicket": {
    "_id": "5c4f0f13b402210dfa442843",
    "date": {
      "start": "2020-01-11T09:00:00.000Z",
      "end": "2020-01-11T12:00:00.000Z"
    },
    "type": "Train"
  },
  "finalCost": 151,
  "chargeId": "ch_1DxavwHXOLFXSoVBA0vdSnpm"
}

```

### HTTP Request
`POST http://localhost:3000/ticket/buy`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data / Stripe error
404 | You reservation already expired


### Query Parameters
Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
owner | true | String | Max length 100 chars
creditCardToken | true | String | Should satisfy [Credit Card Token regex](#creditCardTokenRegex)
buyerInfo.email | true | String | Should satisfy [Email regex](#emailRegex)
buyerInfo.firstName | true | String | Should satisfy [Name regex](#nameRegex)
buyerInfo.middleName | true | String | Should satisfy [Name regex](#nameRegex)
buyerInfo.lastName | true | String | Should satisfy [Name regex](#nameRegex)
buyerInfo.birthDate | true | Timestamp |
buyerInfo.phone | true | String | Should satisfy [Phone regex](#phoneRegex)
buyerInfo.address | true | String | Should satisfy [Address regex](#addressRegex)
buyerInfo.city | true | String | Should satisfy [City regex](#cityRegex)
buyerInfo.zipCode | true | String | Should satisfy [Zip code regex](#zipCodeRegex)

## Book tickets
```javascript
const data = JSON.stringify({
  quantity: 19,
  trips: [{
    id: '5c3e20cbbb4f2d0332a532e0',
    dateStart: 1577836800000,
    dateEnd: 1578614400000
  }, {
    arrivalTicket: '5c3e20cbbb4f2d0332a532e9',
    departureTicket: '5c3e20cbbb4f2d0332a532ea'
  }, {
    id: '5c3e20cbbb4f2d0332a532e2',
    dateStart: 1577836800000,
    dateEnd: 1578614400000
  }, {
    arrivalTicket: '5c3e20cbbb4f2d0332a532ed',
    departureTicket: '5c3e20cbbb4f2d0332a532ee'
  }, {
    id: '5c3e20cbbb4f2d0332a532e4',
    dateStart: 1577836800000,
    dateEnd: 1578614400000
  }]
})
const req = new XMLHttpRequest()
req.open('POST', `http://localhost:3000/ticket/book`)
req.setRequestHeader('Content-type', 'application/json')
req.onload = () => {
  if (req.status === 201) {
    console.log(JSON.parse(req.response))
  } else {
    throw req.response
  }
}
req.send(data)
```

> The above command returns JSON structured like this:

```json
{
  "_id": "5c45efee16a19e172eaaa525",
  "__v": 0,
  "billing": 649,
  "owner": "b382f4e834df5b00852251ba0357ce09abdfa8d5dbfd5fe0452d2154a5e217f1164535790797815e",
  "createdAt": "2019-01-21T16:14:38.536Z",
  "quantity": 2,
  "trips":[{
       "withTime": false,
       "cost": 118,
       "_id": "5c45efee16a19e172eaaa524",
       "trip": "5c45efee16a19e172eaaa4d5",
       "arrivalTicket": "5c45efee16a19e172eaaa4dc",
       "departureTicket": "5c45efee16a19e172eaaa4dd"
     }, {
       "withTime": true,
       "cost": 122,
       "_id": "5c45efee16a19e172eaaa528",
       "trip": "5c45efee16a19e172eaaa4d5",
       "arrivalTicket": "5c45efee16a19e172eaaa4de",
       "departureTicket": "5c45efee16a19e172eaaa4df"
     }, {
       "withTime": false,
       "cost": 150,
       "_id": "5c45efee16a19e172eaaa52c",
       "trip": "5c45efee16a19e172eaaa4d7",
       "arrivalTicket": "5c45efee16a19e172eaaa4f0",
       "departureTicket": "5c45efee16a19e172eaaa4f1 "
     }, {
       "withTime": true,
       "cost": 122,
       "_id": "5c45efee16a19e172eaaa530",
       "trip": "5c45efee16a19e172eaaa4d5",
       "arrivalTicket": "5c45efee16a19e172eaaa4e2",
       "departureTicket": "5c45efee16a19e172eaaa4e3"
     }, {
       "withTime": false,
       "cost": 137,
       "_id": "5c45efee16a19e172eaaa534",
       "trip": "5c45efee16a19e172eaaa4d9",
       "arrivalTicket": "5c45efee16a19e172eaaa504",
       "departureTicket": "5c45efee16a19e172eaaa505"
    }]
}

```

### HTTP Request
`POST http://localhost:3000/ticket/book`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
404 | Trip/Ticket not exist


### Query Parameters
Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
quantity | true | Number |
ownerHash | false | String | If user booked trips and then return to `select trips` view then u should set his owner hash to booking API to prevent rebook these trips
trips | true | Array | Array of chosen trips/tickets
`trips[].id` | Only if client didn't choose time | Array | Array of chosen trips/tickets
`trips[].dateStart` | Only if client didn't choose time | Timestamp |
`trips[].dateEnd` | Only if client didn't choose time | Timestamp |
`trips[].arrivalTicket` | Only if client has chosen time | ID |
`trips[].departureTicket` | Only if client has chosen time | ID |


## Unbook tikets
```javascript
const data = JSON.stringify({
  owner: 'e690e9f53195f99babae55e70e1a0191e60b6999354ae05c05fc29c53c8373ede7db239c90b78387'
  trips: ['5c3e20cbbb4f2d0332a532e0', '5c3e20cbbb4f2d0332a532e2']
})
const req = new XMLHttpRequest()
req.open('POST', `http://localhost:3000/ticket/unbook`)
req.setRequestHeader('Content-type', 'application/json')
req.onload = () => {
  if (req.status === 200) {
    // code
  } else {
    throw req.response
  }
}
req.send(data)
```

> The above command returns JSON structured like this:

```json
{
  "_id": "5c45efee16a19e172eaaa525",
  "__v": 0,
  "billing": 409,
  "owner": "b382f4e834df5b00852251ba0357ce09abdfa8d5dbfd5fe0452d2154a5e217f1164535790797815e",
  "createdAt": "2019-01-21T16:14:38.536Z",
  "quantity": 2,
  "trips":[{
       "withTime": false,
       "cost": 150,
       "_id": "5c45efee16a19e172eaaa52c",
       "trip": "5c45efee16a19e172eaaa4d7",
       "arrivalTicket": "5c45efee16a19e172eaaa4f0",
       "departureTicket": "5c45efee16a19e172eaaa4f1 "
     }, {
       "withTime": true,
       "cost": 122,
       "_id": "5c45efee16a19e172eaaa530",
       "trip": "5c45efee16a19e172eaaa4d5",
       "arrivalTicket": "5c45efee16a19e172eaaa4e2",
       "departureTicket": "5c45efee16a19e172eaaa4e3"
     }, {
       "withTime": false,
       "cost": 137,
       "_id": "5c45efee16a19e172eaaa534",
       "trip": "5c45efee16a19e172eaaa4d9",
       "arrivalTicket": "5c45efee16a19e172eaaa504",
       "departureTicket": "5c45efee16a19e172eaaa505"
    }]
}

```

### HTTP Request
`POST http://localhost:3000/ticket/unbook`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
404 | Trip/Ticket not exist


### Query Parameters
Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
quantity | true | Number |
trips | true | Array | Array of trips ids

## Update ticket
```javascript
const data = JSON.stringify({
  quantity: 10,
})
const req = new XMLHttpRequest()
req.open('PUT', `http://localhost:3000/ticket/5c2dea327b1af914d0dd9472`)
req.setRequestHeader('Content-type', 'application/json')
req.onload = () => {
  if (req.status === 200) {
    console.log(JSON.parse(req.response))
  } else {
    throw req.response
  }
}
req.send(data)
```

> The above command returns JSON structured like this:

```json
{
  "active": true,
  "_id": "5c2dea327b1af914d0dd9472",
  "direction": "arrival",
  "quantity": 10,
  "type": "Train",
  "date": {
    "start": "2019-01-03T10:55:46.965Z",
    "end": "2019-01-03T10:55:46.965Z"
  },
  "trip": {
    "_id": "5c2dea327b1af914d0dd9470",
    ...
  },
  "blockedQuantity": [],
  "createdAt": "2019-01-03T10:55:46.985Z",
  "__v": 0
}
```

### HTTP Request
`PUT http://localhost:3000/ticket/:id`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
404 | Trip not found
404 | Ticket not found


### Query Parameters

Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
id | true | String |

## Find one
```javascript
const req = new XMLHttpRequest()
req.open('GET', `http://localhost:3000/ticket/5c2dea327b1af914d0dd9472`)
req.onload = () => {
  if (req.status === 200) {
    console.log(JSON.parse(req.response))
  } else {
    throw req.response
  }
}
req.send(data)
```

> The above command returns JSON structured like this:

```json
{
  "active": true,
  "_id": "5c2dea327b1af914d0dd9472",
  "direction": "arrival",
  "quantity": 19,
  "type": "Train",
  "date": {
    "start": "2019-01-03T10:55:46.965Z",
    "end": "2019-01-03T10:55:46.965Z"
  },
  "trip": "5c2dea327b1af914d0dd9470",
  "blockedQuantity": [],
  "createdAt": "2019-01-03T10:55:46.985Z",
  "__v": 0
}
```

### HTTP Request
`GET http://localhost:3000/ticket/:id`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
403 | Access denied. You are not administrator
404 | Ticket not found

### Query Parameters

Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
id | true | String |

## [CRM] Find
```javascript
const req = new XMLHttpRequest()
req.open('GET', `http://localhost:3000/ticket/${new Date('2019-01-01').getTime()}/${new Date('2019-01-30').getTime()}`)
req.onload = () => {
  if (req.status === 200) {
    console.log(JSON.parse(req.response))
  } else {
    throw req.response
  }
}
req.send(data)
```

> The above command returns JSON structured like this:

```json
[
  {
    "active": true,
    "_id": "5c2dea327b1af914d0dd9472",
    "direction": "arrival",
    "quantity": 19,
    "type": "Train",
    "date": {
      "start": "2019-01-03T10:55:46.965Z",
      "end": "2019-01-03T10:55:46.965Z"
    },
    "trip": {
      "_id": "5c2dea327b1af914d0dd9470",
      ...
    },
    "blockedQuantity": [],
    "createdAt": "2019-01-03T10:55:46.985Z",
    "__v": 0
  }, {
    ...
  }
]
```

### HTTP Request
`GET http://localhost:3000/ticket/:dateStart/:dateEnd`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data

### Query Parameters

Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
dateStart | true | Timestamp |
dateEnd | true | Timestamp |

## [Dashboard] Find
```javascript
const req = new XMLHttpRequest()
req.open('GET', `http://localhost:3000/dashboard/ticket/0/10/0/0/0/0/0`)
req.onload = () => {
  if (req.status === 200) {
    console.log(JSON.parse(req.response))
  } else {
    throw req.response
  }
}
req.send(data)
```

> The above command returns JSON structured like this:

```json
[
  {
    "active": true,
    "_id": "5c2dea327b1af914d0dd9472",
    "direction": "arrival",
    "quantity": 19,
    "type": "Train",
    "date": {
      "start": "2019-01-03T10:55:46.965Z",
      "end": "2019-01-03T10:55:46.965Z"
    },
    "trip": "5c2dea327b1af914d0dd9470",
    "blockedQuantity": [],
    "createdAt": "2019-01-03T10:55:46.985Z",
    "__v": 0
  }, {
    ...
  }
]
```

### HTTP Request
`GET http://localhost:3000/dashboard/ticket/:page/:limit/:priceStart/:priceEnd/:dateStart/:dateEnd/:quantity`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
403 | Access denied. You are not administrator

### Query Parameters

Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
page | true | Number | Int >= 0
limit | true | Number | Int >= 1
priceStart | true | Number | Int >= 0. Set `0` if you want to omit
priceEnd | true | Number | Int >= 0. Set `0` if you want to omit
dateStart | true | Timestamp | Int >= 0. Set `0` if you want to omit
dateEnd | true | Timestamp | Int >= 0. Set `0` if you want to omit
quantity | true | Number | Int >= 0 and <= 6. Set `0` if you want to omit

## Destroy
```javascript
const req = new XMLHttpRequest()
req.open('DELETE', `http://localhost:3000/ticket/5c26511f8b8c2308f060b623`)
req.onload = () => {
  if (req.status === 200) {
    console.log(JSON.parse(req.response))
  } else {
    throw req.response
  }
}
req.send()
```

### HTTP Request
`DELETE http://localhost:3000/ticket/:id`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
403 | Access denied. You are not administrator
404 | Ticket not found

### Query Parameters

Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
id | true | String |
