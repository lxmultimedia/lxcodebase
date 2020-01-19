const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const CodebaseController = require('./controllers/CodebaseController')
const CategoryController = require('./controllers/CategoryController')

module.exports = (app) => {
	app.post('/register',
		AuthenticationControllerPolicy.register,
		AuthenticationController.register),
	app.post('/login',
		AuthenticationController.login),
	app.get('/codebase',
		CodebaseController.index),
	app.post('/codebase',
		CodebaseController.post),
	app.get('/category',
		CategoryController.index),
	app.post('/category',
		CategoryController.post)	
}