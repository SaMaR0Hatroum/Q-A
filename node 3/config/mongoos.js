const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Backend')
    .then(()=> console.log('connected to DB...'))
    .catch(err => console.log(err))