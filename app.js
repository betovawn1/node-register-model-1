const express = require('express')
const app = express()

const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')

app.use('/', indexRoute)
app.use('/user', userRoute)

app.listen(3000)

module.exports = app;