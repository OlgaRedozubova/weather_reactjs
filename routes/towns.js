const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function(req, res, next) {
    if (req.url === '/') {
        const content = fs.readFileSync("towns.json", "utf8");
        const towns = JSON.parse(content);
        res.send(towns)
    } else {
        next();
    }
});