const body_parser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

const url = 'mongodb+srv://betovawn:qwe123123@cluster0-baxel.mongodb.net/test?retryWrites=true&w=majority'
const options = {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 5,
    useNewUrlParser: true
}

mongoose.connect(url, options)
mongoose.set('useCreateIndex', true)

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao Banco de Dados')
})

mongoose.connection.on('error', err => {
    console.log('Erro na conexão com o Banco de Dados')
})

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do Banco de Dados')
})

app.use(body_parser.urlencoded({
    extended: false
}))

app.use(body_parser.json())

const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')

app.use('/', indexRoute)
app.use('/user', userRoute)

app.listen(3000)

module.exports = app;