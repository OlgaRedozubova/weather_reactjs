const express = require('express');
const server = express();
const fs = require('fs');
const routerWeather = express.Router();
const routerTowns = express.Router();

const Promise = require('bluebird');

const rp = require('request-promise');
const uriWeather = "http://openweathermap.org/data/2.5/weather";
const appid = "b6907d289e10d714a6e88b30761fae22";

const port = process.env.PORT || 5000;


routerWeather.route("/")
    .get(function(req, res){
        const request = require('request');
        const city = "Kiev";

        // request("http://samples.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid,//b6907d289e10d714a6e88b30761fae22',
        //     function (error, response, body) {
        //         let weatherData = JSON.parse(body);
        //         console.log(weatherData, typeof weatherData);
        //         if(!error){
        //             return res.status(200).json(weatherData); // res.end, res.send, res.status(200), res.json, res.sendFile
        //         } else {
        //             return res.json(error);
        //         }
        //     });

        rp({
            uri: uriWeather,
            qs: {
                q: 'Kiev',
                appid: appid
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true,

        })
            .then(function(responseData){
                return res.json(responseData);
            })
            .catch(function(err){
                return res.json(err);
            });

    });

routerWeather.route("/:id")
    .get( function (req, res) {
        rp({
            uri: uriWeather,
            qs: {
                q: req.params.id,
                appid: appid
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true,

        })
            .then(function(responseData){
                return res.json(responseData);
            })
            .catch(function(err){
                return res.json(err);
            });
    });


routerTowns.route("/")
    .get(function(req, res){

      const townsList = JSON.parse(fs.readFileSync("towns.json", "utf8"));
      const promiseList =[];

      townsList.map((item) => (
        //console.log('name', item.name)
        promiseList.push(
          rp({
            uri: uriWeather,
            qs: {
              q: item.name,
              appid: appid
            },
            headers: {
              'User-Agent': 'Request-Promise'
            },
            json: true,
          })
          .then(function(responseData){
            return responseData;
          })
          .catch(function(err){
            return res.json(err);
          })
        )
      ));


      Promise.all(promiseList)
        .then(value => {
        //console.log('value',value);
          return res.json(value);
      });

    });


server.use('/api/weather', routerWeather);
server.use('/api/towns', routerTowns);


server.listen(port, () => console.log(`Listening on port ${port}`));
//server.listen(port, function () { console.log('Приклад застосунку, який прослуховує 3000-ий порт!');});

