const express = require('express');
const server = express();
const fs = require('fs');
const routerWeather = express.Router();
const routerTowns = express.Router();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const Promise = require('bluebird');

const rp = require('request-promise');
const uriWeather = "http://openweathermap.org/data/2.5/weather";
const appid = "b6907d289e10d714a6e88b30761fae22";

const port = process.env.PORT || 5000;


// routerWeather.route("/")
//     .get(function(req, res){
//         const request = require('request');
//         const city = "Kiev";
//
//         // request("http://samples.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid,//b6907d289e10d714a6e88b30761fae22',
//         //     function (error, response, body) {
//         //         let weatherData = JSON.parse(body);
//         //         console.log(weatherData, typeof weatherData);
//         //         if(!error){
//         //             return res.status(200).json(weatherData); // res.end, res.send, res.status(200), res.json, res.sendFile
//         //         } else {
//         //             return res.json(error);
//         //         }
//         //     });
//
//         rp({
//             uri: uriWeather,
//             qs: {
//                 q: 'Kiev',
//                 appid: appid
//             },
//             headers: {
//                 'User-Agent': 'Request-Promise'
//             },
//             json: true,
//
//         })
//         .then(function(responseData){
//             return res.json(responseData);
//         })
//         .catch(function(err){
//             return res.json(err);
//         });
//
//     });
///

function getWeatherTowns(townsList, req, res) { console.log('getWeatherTowns1')
    const promiseList =[];
    townsList.map((item) => (
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
            return res.json(value);
        });
};


routerWeather.route("/")
    .get(function(req, res){
        const townsList = JSON.parse(fs.readFileSync("towns.json", "utf8"));
        getWeatherTowns(townsList, req, res);
    })
    .post(jsonParser, (req, res) => {
            if (!req.body) return res.sendStatus(400);
            console.log('S_req.body', req.body);

            const town = req.body;//{name: townName};
            fs.readFile("towns.json", "utf8", function(err, file){
                if(!err){
                    const towns = JSON.parse(file);
                    let isNeedAddTown = true;
//------------------------------

                    for (key in towns) {
                        if (towns[key].name === town.name) {
                            isNeedAddTown = false;
                            console.log('Town already exists id LikeList!', key)
                        }
                    }
//-----------------------------
                    if (isNeedAddTown) {
                        towns.push(town);
                        const newFile = JSON.stringify(towns);
                        fs.writeFile("towns.json", newFile, function (err) {
                            if (!err) {
                                getWeatherTowns(towns, req, res);
                                console.log('Ok', towns);
                                //  res.send(towns);
                            }
                        });
                    } else {
                        res.sendStatus(204);// ('Already Exists')
                    }
                }
            });
        }
    );


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
        res.send(townsList);
        console.log('get');

    })
    .post(jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
         console.log('S_req.body', req.body);
         //console.log('S_res', res);
        const townName = req.body.name;
        const town = {name: townName};

        const towns = JSON.parse(fs.readFileSync("towns.json", "utf8"));

        towns.push(town);

        //fs.writeFileSync("towns.json", JSON.stringify(towns));
        fs.writeFile("towns.json", JSON.stringify(towns) , function (err) {
            if (!err) {
                console.log('OK!');
                const townsList = JSON.parse(fs.readFileSync("towns.json", "utf8"));
                console.log('townsList',townsList);

                res.send(townsList);
                console.log('server res', res);
            }
        });




        }
    );

// server.post("/api/towns/", jsonParser, function(req, res) {
//     console.log('req', req.body);
// });


server.use('/api/weather', routerWeather);
server.use('/api/towns', routerTowns);


server.listen(port, () => console.log(`Listening on port ${port}`));
//server.listen(port, function () { console.log('Приклад застосунку, який прослуховує 3000-ий порт!');});

