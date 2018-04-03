const express = require('express');
const server = express();
const fs = require('fs');
//const weatherRouter = require('./routes/weather');
const router = express.Router();
const rp = require('request-promise');
//var cheerio = require('cheerio'); // Basically jQuery for node.js
const appid = "b6907d289e10d714a6e88b30761fae22";

const port = process.env.PORT || 5000;



/*
server.get('/', function (req, res) {
    res.send('Hello World!');
});*/

//server.use(express.static(__dirname + "/public"));


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


/*
var options = {
    method: 'GET',
    uri: 'http://samples.openweathermap.org/data/2.5/weather',//?q=Kiev&appid=b6907d289e10d714a6e88b30761fae22',
    json: true,
    headers: {
        'User-Agent': 'Request-Promise'
    },

    transform: function (body) {
        return cheerio.load(body);
    }
};

rp(options)
    .then(function (repos) {
        console.log(repos);
       // console.log('User has %d repos', repos.length);
    })
    .catch(function (err) {
        // Crawling failed...
        console.log('Crawling failed');
    });
*/



/*
rp(options)
    .then(function (repos) {
        console.log('User has %d repos', repos.length);
    })
    .catch(function (err) {
        // API call failed...
    });*/

