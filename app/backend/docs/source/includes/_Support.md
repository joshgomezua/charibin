#Support

## Send email to support
```javascript
const data = JSON.stringify({
  email: 'Jalon.Bogan@example.net',
  firstName: 'Kirsten',
  lastName: 'Ruecker',
  phone: '+48 123 123 123',
  message: 'Example test message'
 })
const req = new XMLHttpRequest()
req.open('POST', `http://localhost:3000/support`)
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

### HTTP Request
`POST http://localhost:3000/support`

### Errors
Status | Description
------ | -----------
400 | You sent shitty data


### Query Parameters
Parameter | Required | Type | Requirements
--------- | -------- | ---- | ------------
email | true | String | Should satisfy [Email regex](#emailRegex)
firstName | true | String | Should satisfy [Name regex](#nameRegex)
lastName | true | String | Should satisfy [Name regex](#nameRegex)
phone | true | String | Should satisfy [Phone regex](#phoneRegex)
message | true | String | Range: 1 - 2000 chars
