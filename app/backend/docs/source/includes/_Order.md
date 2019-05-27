# Order

## Get All Orders
```javascript
const req = new XMLHttpRequest()
req.open('GET', `http://localhost:3000/order/:page/:limit/:sortField?/:sortOrder?`)
req.onload = () => {
  if (req.status === 200) {
    console.log(JSON.parse(req.response))
  } else {
    throw req.response
  }
}
req.send()
```

> The above command returns JSON structured like this:

```json
{
  "results": [{
    "_id": "5c5807ecde8a5d030f7a55b7",
    "sent": false,
    "buyer": {
      "name": "Conner",
      "email": "Destany.Ward@example.net",
      "phone": "345.659.1944",
      "birthDate": "2018-06-21T11:03:28.978Z",
      "address": "6563 Stanford Falls",
      "city": "Lake Davestad",
      "zipCode": "37392-4630"
    },
    "stripeChargeId": "1757432905893",
    "selected": "New Efrainmouth, Lake Dereck, Wileyberg, Ceceliaberg",
    "deselected": "Odellshire",
    "finalSelection": "Gradymouth",
    "finalDestination": "East Reyes",
    "date": {
      "arrival": {
        "start": "2019-02-03T10:29:03.632Z",
        "end": "2019-02-03T11:13:33.931Z"
      },
      "departure": {
        "start": "2019-02-24T14:29:03.632Z",
        "end": "2019-02-24T17:13:33.931Z"
      }
    },
    "quantity": 6,
    "ticketPrice": 228,
    "arrivalTimePrice": 5,
    "departureTimePrice": 5,
    "deselectionPrice": 23,
    "totalPrice": 891,
    "createdAt": "2019-02-04T09:37:48.940Z",
    "__v": 0
  }],
  "status": {
    "total": 1,
    "offset": 0,
    "done": true
  }
}
```


### HTTP Request
`GET http://localhost:3000/order/:page/:limit/:sortField?/:sortOrder?`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
403 | Access Denied


### Query Parameters
Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
`page` | true | number | `1000 > page >= 0`
`limit` | true | number | `1000 > limit > 0`
`sortField` | false | string | Should satisfy [Sort Field](#sortFieldRegex) reg exp.
`sortOrder` | false | string | Should satisfy [Sort Order](#sortOrderRegex) reg exp.


## Update One Order
```javascript
const data = { sent: true };
const req = new XMLHttpRequest()
req.open('PATCH', `http://localhost:3000/order/:order_id`)
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
  "_id": "5c5807ecde8a5d030f7a55b7",
  "sent": true,
  "buyer": {
    "name": "Conner",
    "email": "Destany.Ward@example.net",
    "phone": "345.659.1944",
    "birthDate": "2018-06-21T11:03:28.978Z",
    "address": "6563 Stanford Falls",
    "city": "Lake Davestad",
    "zipCode": "37392-4630"
  },
  "stripeChargeId": "1757432905893",
  "selected": "New Efrainmouth, Lake Dereck, Wileyberg, Ceceliaberg",
  "deselected": "Odellshire",
  "finalSelection": "Gradymouth",
  "finalDestination": "East Reyes",
  "date": {
    "arrival": {
      "start": "2019-02-03T10:29:03.632Z",
      "end": "2019-02-03T11:13:33.931Z"
    },
    "departure": {
      "start": "2019-02-24T14:29:03.632Z",
      "end": "2019-02-24T17:13:33.931Z"
    }
  },
  "quantity": 6,
  "ticketPrice": 228,
  "arrivalTimePrice": 5,
  "departureTimePrice": 5,
  "deselectionPrice": 23,
  "totalPrice": 891,
  "createdAt": "2019-02-04T09:37:48.940Z",
  "__v": 0
}
```

### HTTP Request
`PATCH http://localhost:3000/order/:order_id`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
403 | Access Denied


### Query Parameters
Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
`order_id` | true | string | Must be a ObjectID
