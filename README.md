# weather-service [/weather-service]

'weather-service' endpoint.

## weather [POST]

'weather-service' endpoint.

+ Request (application/json)
    + Body
            {
              "city": "Philadelphia",
              "country": "US"
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "xx Celcius"
            }