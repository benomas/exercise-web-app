var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV   : '"development"',
	API_URL    : '"http://localhost/ssm-api/public"',
	PASSPORT   : true,
	API_CLIENT : '2',
	API_SECRET : '"devdevdevdevdevdevdevdevdevdevdevdevdevd"'
})
