const User = require('../Schema/User.js')
const bcrypt = require('bcrypt')

const getUser = (req, res) => {
	User.findById(req.query.id)
		.then((doc) => {
			if (!doc) {
				return res.status(422).send('User Not found!!')
			}
			res.status(200).send(doc)
		})
		.catch((err) => {
			throw err
		})
}

const userLogin = (req, res) => {
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
}

const userSignUp = (req, res) => {
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
}

module.exports = {
	getUser,
	userLogin,
	userSignUp,
}
