#Login

## Login
```javascript
const data = JSON.stringify({
  email: 'test@test.com',
  password: '22AA@@aaasasd'
})
const req = new XMLHttpRequest()
req.open('POST', `http://localhost:3000/login`)
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
  "token": "xyz",
  "user": {
    "_id": "5af959ee4aa9f3021bdee0a7",
    "email": "test@test.com",
    "role": "Administrator",
    "createdAt": "2018-05-14T09:42:06.972Z",
    "__v": 0
  }
}

```

### HTTP Request

`POST http://localhost:3000/login`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data
401 | Password not match
403 | User must confirm email
404 | Email not found



### Query Parameters

Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
email | true | String | Should satisfy [Email regex](#emailRegex)
password | true | String |
