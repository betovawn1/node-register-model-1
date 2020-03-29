const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    created: {type: Date, default: Date.now}
})

userSchema.pre('save', function(next) {
    let user = this

    if (!user.isModified('password')) return next()

    bcrypt.hash(user.password, 10, (err, encrypted) => {
        user.password = encrypted
        return next()
    })
})

module.exports = mongoose.model('user', userSchema)