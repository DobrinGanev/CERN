require('dotenv').config()
import express from 'express'
import babelPolyfill from "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom/server";
import { RouterContext, match,createMemoryHistory } from "react-router";
import configureStore from "./store.js";
import { Provider } from 'react-redux';
import routesContainer from "./routes";
import url from "url";
import serverConfig from '../config';
import { cassandra } from '../cassandra/common/cassandra';
let routes = routesContainer;

const server = express()
server.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`CERN is running on port: ${serverConfig.port}! Build something disruptive!`); // eslint-disable-line
  }
});

/*
Sample schema
https://github.com/pmcfadin/cassandra-videodb-sample-schema
 * @param {singleton cassandra client instance} cassandra.
*/
require("../cassandra/videodb-schema")(cassandra);

//test
server.get('/hello', function (req, res) {
  var data = [];
  data.push({
    message: "Updated message from server: Hello world from  the server"
  })
  //for effect to see the update of the state
  setTimeout(function () {
    res.send(data);
  }, 3000)

});

var envset = {
  production: process.env.NODE_ENV === 'production'
};
const hostname = envset.production ? (process.env.HOSTNAME || process['env'].HOSTNAME) : "localhost";

/**
 * Create Redux store, and get intitial state.
 */
const store = configureStore();
const initialState = store.getState();
server.use(function(req, res, next) {
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
      return;
    }
    if (error || !renderProps) {
      next();
      return;
    }
	const reactString = ReactDOM.renderToString(
		<Provider store={store}>
      <RouterContext {...renderProps} />
		</Provider>
	);
	const webserver = __PRODUCTION__ ? "" : `//${hostname}:8080`;
	let output = (
		`<!doctype html>
		<html lang="en-us">
			<head>
				<meta charset="utf-8">
				<title></title>
			</head>
			<body>
				<div id="react-root">${reactString}</div>
				<script>
					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
				</script>
				<script src=${webserver}/dist/client.js></script>
			</body>
		</html>`
		);
    res.send(output);
  });
});

if (__DEV__) {
	if (module.hot) {
		console.log("[HMR] Waiting for server-side updates");

		module.hot.accept("./routes", () => {
			routes = require("./routes");
		});

		module.hot.addStatusHandler((status) => {
			if (status === "abort") {
				setTimeout(() => process.exit(0), 0);
			}
		});
	}
}
