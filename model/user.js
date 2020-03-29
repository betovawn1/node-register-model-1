const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    created: {type: Date, default: Date.now}
})

module.exports = mongoose.model('user', userSchema)