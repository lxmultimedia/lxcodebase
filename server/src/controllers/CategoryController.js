const {Category} = require('../models')

module.exports = {
	async index(req,res) {
		try {
			const categories = Category.findAll({
				limit: 10
			})
			res.send(categories)
		} catch (err) {
			res.status(500).send({
				error: 'An error has occured tryin to fetch the categories'
			})
		}
	},		
	async post(req,res) {
		try {
			const category = Category.create(req.body)
			res.send(category)
		} catch (err) {
			res.status(500).send({
				error: 'An error has occured creating a category'
			})
		}
	}	
}