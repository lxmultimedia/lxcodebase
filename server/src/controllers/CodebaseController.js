const {CodeEntry} = require('../models')

module.exports = {
	async index(req,res) {
		try {
			const entries = CodeEntry.findAll({
				limit: 10
			})
			res.send(entries)
		} catch (err) {
			res.status(500).send({
				error: 'An error has occured tryin to fetch the entries'
			})
		}
	},		
	async post(req,res) {
		try {
			const entry = CodeEntry.create(req.body)
			res.send(entry)
		} catch (err) {
			res.status(500).send({
				error: 'An error has occured creating an entry'
			})
		}
	}	
}