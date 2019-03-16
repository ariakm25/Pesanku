const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./config/db');

const PORT = process.env.PORT || 3000;
const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.json('PESANKU.WEB.ID');
})

const users = require('./controller/user.controller');

app.use('/users', users);

app.listen(PORT, console.log('Running on 3000'));
