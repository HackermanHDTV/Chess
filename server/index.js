const express = require('express')
const cors = require('cors')
const http = require('http')
require('dotenv').config()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const app = express()
const path = require("path")
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
})

const { v4 } = require('uuid')

const { userSignUp, userLogin, getUser } = require('./util/AuthRoutes.js')
const { getPGN, savePGN } = require('./util/PGNroute.js')

mongoose.connect(
  process.env.MONGODB_SRV,
    { 
        dbName: "test",
        useNewUrlParser: true
    },
  () => {
    console.log('Mongoose connected!')
  }
)

let availableRoom

io.on('connection', (socket) => {
  console.log('socket connected!')

  socket.on('join-room', () => {
    if (availableRoom) {
      socket.join(availableRoom)

      io.to(socket.id).emit('init', availableRoom, 'b')
      io.to(availableRoom).emit('begin')

      availableRoom = null
    } else {
      availableRoom = v4()

      socket.join(availableRoom)

      io.to(socket.id).emit('init', availableRoom, 'w')
    }
  })

  socket.on('move', (roomID, moveObj) => {
    socket.broadcast.to(roomID).emit('make-move', moveObj)
  })
})

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: process.env.CLIENT_URL,
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

app.use(express.static(path.join(__dirname, "build")))

app.get("/*", (_, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

module.exports = server
