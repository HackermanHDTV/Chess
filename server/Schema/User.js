const { Schema, Model } = require('mongoose')

const userSchema = new Schema({
	username: String,
	password: String,
})

const User = Model('User', userSchema)

module.exports = User
