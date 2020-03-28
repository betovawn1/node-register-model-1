const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    return res.send({message: 'Tudo OK com o método GET da raiz'})
})

module.exports = router;