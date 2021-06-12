const express = require('express')
const cors = require('cors')
const http = require('http')
require('dotenv').config()
const port = 5000
const mongoose = require('mongoose')
const { userSignUp, userLogin, getUser } = require('./util/AuthRoutes.js')
const { getPGN, savePGN } = require('./util/PGNroute.js')

const app = express()
const server = http.createServer(app)

mongoose.connect(
	process.env.MONGODB_SRV,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log('Mongoose connected!')
	}
)

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		origin: '*',
		credentials: true,
	})
)

// Auth routes
app.post('/api/login', userLogin)
app.post('/api/signup', userSignUp)
app.get('/api/user', getUser)

// PGN routes
app.get('/api/getPGN/:id', getPGN)
app.post('/api/postPGN', savePGN)

server.listen(port, '0.0.0.0', () => {
	console.log(`Server is listening on port ${port}`)
})
