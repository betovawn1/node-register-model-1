const express = require('express')
const router = express.Router()
const user = require('../model/user')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    try {
        const data = await user.find({})
        return res.send(data)
    } catch (err) {
        return res.send({error: 'Erro na consulta de usuários!'})
    }
})

router.post('/create', async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) return res.send({error: 'Dados Insuficientes'})

    try {
        if (await user.findOne({email})) return res.send({error: 'Usuário já cadastrado'}) 

        const data = await user.create(req.body)
        return res.send(data)
    } catch (err) {
        return res.send({error: 'Erro ao buscar usuário!'})
    }
})

router.post('/auth', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) return res.send({error: 'Dados Insuficientes'})

    try {
        const data = await user.findOne({email}).select('+password')
        if (!data) res.send({error: 'Usuário não registrado'})

        const pass_ok = await bcrypt.compare(password, data.password)
        if (!pass_ok) res.send({error: 'Erro na comparação de senhas'})
        
        return res.send(data)

    } catch (err) {
        return res.send({error: 'Erro ao buscar usuário!'})
    }
})

module.exports = router;