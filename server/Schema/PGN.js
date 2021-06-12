const { Schema, model } = require('mongoose')

const pgnSchema = new Schema({
	whitePlayer: String,
	blackPlayer: String,
	moveNotation: [{ white: String, black: String }],
})

const PGN = model('PGN', pgnSchema)

module.exports = PGN
