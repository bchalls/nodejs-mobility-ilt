var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');

function weatherRoute() {
  var weather = new express.Router();
  weather.use(cors());
  weather.use(bodyParser());

  weather.post('/', function(req, res) {
    console.log(new Date(), 'In weather route POST / req.query=', req.query);

    var city = req.body.city;
    var country = req.body.country;
    var unit = req.body.unit;

    console.log('city=' + city);
    console.log('country=' + country);
    console.log('unit=' + unit);

    // Call the external OpenWeatherMap RESTful web service.
    //
    // NOTE: You need to include your own API key (APPID) in the URL below.
    //
    var loc =
      'http://api.openweathermap.org/data/2.5/weather?units=metric&q=' +
      city + ',' + country + '&units=' + unit +
      "&APPID=f13acc3a7cd7268572c996fbfeeb0740";

    console.log(new Date(), 'loc=' + loc);

    // let's a make a web request
    request.get(loc).pipe(res);
  });

  return weather;
}

module.exports = weatherRoute;
