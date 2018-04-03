const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function (req, res, next) {
   if (req.url === '/'){
       const content = fs.readFileSync("weather.json", "utf8");
       const weather = JSON.parse(content);
       res.send(weather);
   } else {
       next();
   }
});