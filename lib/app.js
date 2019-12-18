const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/breweries', require('./routes/breweries'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
