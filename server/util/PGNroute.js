const PGN = require('../Schema/PGN')

const getPGN = (req, res) => {
	PGN.findById(req.params.id)
		.then((doc) => {
			if (!doc) {
				res.status(422).send('PGN Not Found!')
			}
			res.status(200).send(doc)
		})
		.catch((err) => {
			throw err
		})
}

const savePGN = (req, res) => {
	const newPGN = PGN({
		whitePlayer: req.body.white,
		blackPlayer: req.body.blackPlayer,
		moveNotation: req.body.moves,
	})
	newPGN
		.save()
		.then(() => {
			res.status(200).send('Sucess!')
		})
		.catch((err) => {
			throw err
		})
}

module.exports = {
	getPGN,
	savePGN,
}
