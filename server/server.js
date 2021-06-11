const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const http = require('http')
require('dotenv').config()
const server = http.createServer(app)
const port = 5000
const mongoose = require('mongoose')

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
		origin: 'http://localhost:3000',
		credentials: true,
	})
)

app.post('/api/login', (req, res) => {})

app.post('/api/signup', (req, res) => {})

server.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})
