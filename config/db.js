require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser : true}, (err) => {
    if (!err) { console.log('Koneksi Dengan MongoDB Sukses.') }
    else { console.log('Koneksi Dengan MongoDB Gagal :' + err) }
});

require('../models/Message');