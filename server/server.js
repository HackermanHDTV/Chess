const express = require('express')
const cors = require('cors')
const app = express()

const http = require('http')
require('dotenv').config()
const server = http.createServer(app)
const port = 5000
const mongoose = require('mongoose')
// const User = require('./Schema/User.js')
const PGN = require('./Schema/PGN.js')
const { userSignUp, userLogin, getUser } = require('./util/AuthRoutes.js')
const { getPGN, savePGN } = require('./util/PGNroute.js')

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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		origin: 'http://192.168.1.38:3000',
		credentials: true,
	})
)

// Auth routes
app.post('/api/login', userLogin)
app.post('/api/signup', userSignUp)
app.post('/api/user', getUser)

// PGN routes
app.get('/api/getPGN/:id', getPGN)
app.post('/api/postPGN', savePGN)

server.listen(port, '0.0.0.0', () => {
	console.log(`Server is listening on port ${port}`)
})
