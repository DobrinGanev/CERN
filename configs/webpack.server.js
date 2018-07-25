const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const fs = require("fs");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	target: "node",
	cache: false,
	context: __dirname,
	debug: false,
	devtool: "source-map",
	entry: ["../server/server"],
	output: {
		path: path.join(__dirname, "../dist"),
		filename: "server.js"
	},
	plugins: [
		new webpack.DefinePlugin({ __CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEV__: false }),
		new webpack.DefinePlugin({ "process.env": { NODE_ENV: '"production"' } }),
		new ExtractTextPlugin("[name].css", { allChunks: true })
	],
	module: {
		loaders: [
			{ test: /\.json$/, loaders: ["json"] },
			{ test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/, loaders: ["file?context=static&name=/[path][name].[ext]"], exclude: /node_modules/ },
			{ test: /\.js$/, loaders: ["babel?presets[]=es2015&presets[]=stage-0&presets[]=react"], exclude: /node_modules/ },
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
		],
		noParse: /\.min\.js/
	},
	externals: [nodeExternals({
		whitelist: ["webpack/hot/poll?1000"]
	})],
	resolve: {
		modulesDirectories: [
			"src",
			"node_modules",
			"static"
		],
		extensions: ["", ".json", ".js"]
	},
	root: [
		path.resolve('./cassandra'),
	],
	node: {
		__dirname: true,
		fs: "empty"
	}
};
