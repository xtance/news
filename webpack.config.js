const path = require('path')

module.exports = {
	watch: true,
	entry: path.resolve(__dirname, 'resources') + '/react/App.js',
	// Where files should be sent once they are bundled
	output: {
		path: path.join(__dirname, '/public'),
		filename: 'index.bundle.js'
	},
	// webpack 5 comes with devServer which loads in development mode
	devServer: {
		port: 3000,
		watchContentBase: true
	},
	// Rules of how webpack will take our files, complie & bundle them for the browser 
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /nodeModules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			}
		]
	},
	plugins: [],
}
