const express = require('express');
const server = express();
const fs = require('fs');
const router = express.Router();
const rp = require('request-promise');
const appid = "b6907d289e10d714a6e88b30761fae22";

const port = process.env.PORT || 5000;


router.route("/weather")
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
            uri: "http://samples.openweathermap.org/data/2.5/weather",
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

router.route("/weather/:id")
    .get( function (req, res) {
        rp({
            uri: "http://samples.openweathermap.org/data/2.5/weather",
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


server.use('/', router);


server.listen(port, () => console.log(`Listening on port ${port}`));
//server.listen(port, function () { console.log('Приклад застосунку, який прослуховує 3000-ий порт!');});

