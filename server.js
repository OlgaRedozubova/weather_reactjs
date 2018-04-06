const express = require('express');
const server = express();

const api = require('./routes/api');
const port = process.env.PORT || 5000;


server.use('/api', api);
server.listen(port, () => console.log(`Listening on port ${port}`));


