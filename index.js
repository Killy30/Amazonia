const express = require('express')
const app = express();
const path = require('path')
require('./database/configDatabase')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./router/route'))

app.listen(4000, () =>{
    console.log('server connected');
})