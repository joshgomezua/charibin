# Regex patterns

<a name="emailRegex"></a>
### Email RegEx
<aside>
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,10}))$/
</aside>

<a name="passwordRegex"></a>
### Password RegEx
<aside>
/^(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-](?=.*[0-9])(?=.*[a-z]).{7,}$/
</aside>

<a name="directionRegex"></a>
### Direction RegEx
<aside>
/^(arrival|departure)$/
</aside>

<a name="typeRegex"></a>
### Type RegEx
<aside>
/^(Train)$/
</aside>

<a name="creditCardTokenRegex"></a>
### Credit Card Token RegEx
<aside>
/^tok_[a-z0-9]{1,50}$/gi
</aside>

<a name="nameRegex"></a>
### Name RegEx
<aside>
/^[\p{L}]{1,20}$/u
</aside>

<a name="phoneRegex"></a>
### Phone RegEx
<aside>
/^[\d\- ]{6,14}$/
</aside>

<a name="addressRegex"></a>
### Address RegEx
<aside>
/^[\p{L}\d.\/ ]{1,50}$/u
</aside>

<a name="cityRegex"></a>
### City RegEx
<aside>
/^[\p{L} ]{1,20}$/u
</aside>

<a name="zipCodeRegex"></a>
### Zip Code RegEx
<aside>
/^[\p{L} ]{1,20}$/u
</aside>

<a name ="sortFieldRegex"></a>
### Sort Field RegEx
<aside>
/^(buyer\.name|buyer\.email|buyer\.phone|buyer\.birthDate|buyer\.address|buyer\.city|buyer\.zipCode|stripeChargeId|selected|deselected|finalSelection|finalDestination|date\.start|date\.end|quantity|ticketPrice|isTimeSelected|deselectionPrice|totalPrice|sent|createdAt|_id|__v)$/i
</aside>

<a name ="sortOrderRegex"></a>
### Sort Order RegEx
<aside>
/^(ascending|descending)$/i
</aside>
