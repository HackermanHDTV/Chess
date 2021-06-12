const express = require('express')
const cors = require('cors')
const app = express()
const bcrypt = require('bcrypt')
const http = require('http')
require('dotenv').config()
const server = http.createServer(app)
const port = 5000
const mongoose = require('mongoose')
const User = require('./Schema/User.js')

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

app.get('/api/user', (req, res) => {
  User.findById(req.query.id)
    .then((doc) => {
      res.status(200).send(doc)
    })
    .catch((err) => {
      throw err
    })
})

app.post('/api/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, doc) => {
    if (err) {
      throw err
    }
    if (!doc) {
      res.status(500).send('Invalid!!')
    } else {
      bcrypt.compare(req.body.password, doc.password, (err, result) => {
        if (err) {
          throw err
        }
        if (result) {
          res.status(200).send(doc)
        } else {
          res.status(500).send('Invalid!!')
        }
      })
    }
  })
})

app.post('/api/signup', (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) {
      throw err
    }
    if (doc) {
      res.status(422).send('username in use!')
    } else {
      const newUser = User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
      })

      await newUser.save()
      res.status(200).send(newUser)
    }
  })
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
