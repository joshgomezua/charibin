#Trip

## Create trip
```javascript
const data = JSON.stringify({
  name: 'South Donnell East',
  photo: 'data:image/png;base64,xyz',
  price: 130,
  discount: 39,
  deselectionPrice: 7,
})
const req = new XMLHttpRequest()
req.open('POST', `http://localhost:3000/trip`)
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
  "fake": false,
  "active": true,
  "tickets": [],
  "_id": "5c26511f8b8c2308f060b623",
  "name": "South Donnell East",
  "photo": "data:image/png;base64,xyz",
  "price": 130,
  "discount": 39,
  "duration": 10,
  "deselectionPrice": 7,
  "createdAt": "2018-12-28T16:36:47.859Z",
  "__v": 0
}
```

### HTTP Request
`POST http://localhost:3000/trip`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
403 | Access denied. You are not administrator
409 | Trip already exist


### Query Parameters
Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
name | true | String | Range: 1 - 40 chars
fake | false | Boolean | Default: false
active | false | Boolean | Default: true
photo | true | String | Must be in base64 encoded. Max 5MB
price | true | Number | Range: 0 - 1000000
discount | true | Number | In %. Range: 0 - 100
duration | true | Number | Range: 1 - 100000
deselectionPrice | true | String | Range: 0 - 1000000
createdAt | false | Date | Read only


## Update trip
```javascript
const data = JSON.stringify({
  name: 'new_name',
})
const req = new XMLHttpRequest()
req.open('PUT', `http://localhost:3000/trip/5c26511f8b8c2308f060b623`)
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
  "fake": false,
  "active": true,
  "tickets": [],
  "_id": "5c26511f8b8c2308f060b623",
  "name": "new_name",
  "photo": "data:image/png;base64,xyz",
  "price": 130,
  "discount": 39,
  "deselectionPrice": 7,
  "createdAt": "2018-12-28T16:36:47.859Z",
  "__v": 0
}
```

### HTTP Request
`PUT http://localhost:3000/trip/:id`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
404 | Trip not found


### Query Parameters

Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
id | true | String |

## Find one
```javascript
const req = new XMLHttpRequest()
req.open('GET', `http://localhost:3000/trip/5c26511f8b8c2308f060b623`)
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
  "fake": false,
  "active": true,
  "deleted": false,
  "tickets": [],
  "_id": "5c26511f8b8c2308f060b623",
  "name": "South Donnell East",
  "photo": "data:image/png;base64,xyz",
  "price": 130,
  "discount": 39,
  "deselectionPrice": 7,
  "createdAt": "2018-12-28T16:36:47.859Z",
  "__v": 0
}
```

### HTTP Request
`GET http://localhost:3000/trip/:id`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
403 | Access denied. You are not administrator
404 | Trip not found

### Query Parameters

Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
id | true | String |

## Get list of trips names
```javascript
const req = new XMLHttpRequest()
req.open('GET', `http://localhost:3000/tripnames`)
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
[
  { "_id": "5c34bc9c30c83102f75416a6", "name": "Port Daronshire" },
  { "_id": "5c34bc9c30c83102f75416a7", "name": "Candidoborough" },
  { "_id": "5c34bc9c30c83102f75416a8", "name": "Gleasonberg" },
  { "_id": "5c34bc9c30c83102f75416a9", "name": "Beattyberg" },
]
```

### HTTP Request
`GET http://localhost:3000/tripnames`

### Errors
Status | Description
------ | -----------
403 | Access denied. You are not administrator



## [CRM] Find
```javascript
const req = new XMLHttpRequest()
req.open('GET', `http://localhost:3000/trip/0/10`)
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
  "results": [
    {
      "fake": false,
      "active": true,
      "deleted": false,
      "tickets": [],
      "_id": "5c26511f8b8c2308f060b623",
      "name": "South Donnell East",
      "photo": "data:image/png;base64,xyz",
      "price": 130,
      "discount": 39,
      "deselectionPrice": 7,
      "createdAt": "2018-12-28T16:36:47.859Z",
      "__v": 0
    }, {
      ...
    }
  ],
  "status": {
    "total": 23,
    "offset": 0,
    "done": false
  }
}
```

### HTTP Request
`GET http://localhost:3000/trip/:page/:limit`

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

## Destroy
```javascript
const req = new XMLHttpRequest()
req.open('DELETE', `http://localhost:3000/trip/5c26511f8b8c2308f060b623`)
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
`DELETE http://localhost:3000/trip/:id`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
403 | Access denied. You are not administrator
404 | Trip not found

### Query Parameters

Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
id | true | String |
