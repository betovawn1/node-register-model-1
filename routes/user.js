const express = require('express')
const router = express.Router()
const user = require('../model/user')

router.get('/', (req, res) => {
    user.find({}, (err, data) => {
        if (err) return res.send({error: 'Erro na consulta de usuários!'})
        return res.send(data)
    })
})

router.post('/create', (req, res) => {
    const {email, password} = req.body

    if (!email || !password) return res.send({error: 'Dados Insuficientes'})

    user.findOne({email}, (err, data) => {
        if (err) return res.send({error: 'Erro ao buscar usuário!'})
        if (data) return res.send({error: 'Usuário já cadastrado'})

        user.create(req.body, (err, data) => {
            if (err) return res.send({error: 'Erro ao cadastrar usuário!'})
            return res.send({error: 'Usuário cadastrado => ', data})
        })
    })
})

module.exports = router;