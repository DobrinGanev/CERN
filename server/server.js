require('dotenv').config()
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, RouterContext } from 'react-router'
import configureStore from '../client/store.js'
import { Provider } from 'react-redux'
import routesContainer from '../client/routes'
import { renderRoutes, matchRoutes } from "react-router-config"
import serverConfig from '../config'
import { cassandra } from '../cassandra/common/cassandra'

let routes = routesContainer

const server = express()
server.listen(serverConfig.port, error => {
  if (!error) {
    console.log(`CERN is running on port: ${serverConfig.port}! Build something disruptive!`); // eslint-disable-line
  }
})


// require('../cassandra/sampleData/examples/videodb/videodb-schema')(cassandra)

// test
server.get('/hello', (req, res) => {
  const data = []
  data.push({
    message: 'Updated message from server: Hello world from  the server'
  })
  // for effect to see the update of the state
  setTimeout(() => {
    res.send(data)
  }, 3000)
})

const envset = {
  production: process.env.NODE_ENV === 'production'
}
const hostname = envset.production
  ? process.env.HOSTNAME || process['env'].HOSTNAME
  : 'localhost'

/**
 * Create Redux store, and get intitial state.
 */
const store = configureStore()
const initialState = store.getState()
// server.use((req, res, next) => {
//   // match(
//   //   { routes, location: req.url },
//   //   (error, redirectLocation, renderProps) => {
//   // if (redirectLocation) {
//   //   res.redirect(redirectLocation.pathname + redirectLocation.search)
//   //   return
//   // }
//   // if (error || !renderProps) {
//   //   next()
//   //   return
//   // }
//   const context = {}

//   const html = ReactDOMServer.renderToString(
//     <StaticRouter
//       location={req.url}
//       context={context}
//     >
//       <Provider store={store}>
//         <RouterContext {...renderProps} />
//       </Provider>
//     </StaticRouter>
//   )
//   // const reactString = ReactDOM.renderToString(
//   //   <Provider store={store}>
//   //     <RouterContext {...renderProps} />
//   //   </Provider>
//   // )
//   const webserver = __PRODUCTION__ ? '' : `//${hostname}:8080`

//   const output = `<!doctype html>
// 		<html lang="en-us">
// 			<head>
// 				<meta charset="utf-8">
// 				<title>
//          </title>
//          <link href=${webserver}/dist/main.css rel=stylesheet/>
//          <link rel=stylesheet href=${webserver}/node_modules/material-design-lite/material.min.css>
//          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
// 			</head>
// 			<body>
// 				<div id="react-root">${html}</div>
// 				<script>
// 					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
// 				</script>
// 				<script src=${webserver}/dist/client.js></script>
//         <script src=${webserver}/node_modules/material-design-lite/material.min.js></script>
// 			</body>
// 		</html>`
//   res.send(output)
//   // }
//   //)
// })
server.get('/*', (req, res) => {
  const webserver = __PRODUCTION__ ? '' : `//${hostname}:8080`
  const context = {}
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      {renderRoutes(routes)}
      <Provider store={store}>
        <RouterContext {...context} />
      </Provider>
    </StaticRouter>
  )
  const output = `<!doctype html>
		<html lang="en-us">
			<head>
				<meta charset="utf-8">
				<title>
         </title>
         <link href=${webserver}/dist/main.css rel=stylesheet/>
         <link rel=stylesheet href=${webserver}/node_modules/material-design-lite/material.min.css>
         <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
			</head>
			<body>
				<div id="react-root">${html}</div>
				<script>
					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
				</script>
				<script src=${webserver}/dist/client.js></script>
        <script src=${webserver}/node_modules/material-design-lite/material.min.js></script>
			</body>
		</html>`
  return res.send(output)
})

if (__DEV__) {
  if (module.hot) {
    console.log('[HMR] Waiting for server-side updates')

    module.hot.accept('../client/routes', () => {
      routes = require('../client/routes')
    })

    module.hot.addStatusHandler(status => {
      if (status === 'abort') {
        setTimeout(() => process.exit(0), 0)
      }
    })
  }
}
