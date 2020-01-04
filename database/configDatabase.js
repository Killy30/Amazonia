const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/libreria', {
    useNewUrlParser: true
})
    .then(db => console.log('database connected'))
    .catch(err => console.log(err))