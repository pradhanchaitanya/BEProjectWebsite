// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const controller = require('../controllers')

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
	res.render('login', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
})

router.post('/login', (req, res) => {
	const username = req.body.username
	const password = req.body.password

	const userController = controller

	if (userController == null) {
		res.json({
				confirmation: 'failure',
				meesage: 'Invalid request'
		})
	}

	if (username == '' || password == '') {
		res.json({
			confirmation: 'failure',
			meesage: 'Fields empty'
		})
	}

	let credentials = {
		username: username,
		password: password
	}

	userController.get(credentials)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'failure',
			message: err.message
		})
	})
})

router.get('/register', (req, res) => {
	res.render('register')
})

router.get('/test', (req, res) => {
	res.json({
		confirmation: 'success',
		message: 'This is a test endpoint'
	})
})

module.exports = router
