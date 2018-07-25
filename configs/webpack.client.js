const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	target: "web",
	cache: false,
	context: __dirname,
	debug: false,
	devtool: false,
	entry: ["../client/client"],
	output: {
		path: path.join(__dirname, "../static/dist"),
		filename: "client.js",
		chunkFilename: "[name].[id].js"
	},
	plugins: [
		new webpack.DefinePlugin({ __CLIENT__: true, __SERVER__: false, __PRODUCTION__: true, __DEV__: false }),
		new webpack.DefinePlugin({ "process.env": { NODE_ENV: '"production"' } }),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
		new ExtractTextPlugin("[name].css", { allChunks: true })
	],
	module: {
		loaders: [
			{ test: /\.json$/, loaders: ["json"] },
			// Extract css files
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			// Optionally extract sass files
			// or any other compile-to-css language
			{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
			}

		],
		postLoaders: [
			{ test: /\.js$/, loaders: ["babel?presets[]=es2015&presets[]=stage-0&presets[]=react"], exclude: /node_modules/ }
		],
		noParse: /\.min\.js/
	},
	resolve: {
		modulesDirectories: [
			"src",
			"node_modules",
			"web_modules",
			"cassandra"
		],
		extensions: ["", ".json", ".js"]
	},
	root: [
		path.resolve('./cassandra'),
	],
	node: {
		__dirname: true,
		fs: 'empty'
	}
};
