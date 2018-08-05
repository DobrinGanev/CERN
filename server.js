import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import express from 'express'
import config from './webpack.config'
import React from 'react'
import StaticRouter from 'react-router-dom/StaticRouter'
import { renderToString } from 'react-dom/server'
import configureStore from './src/store'
import { Provider } from 'react-redux'
import App from './src/App'

const initialState = { count: 10 }
const { store, history } = configureStore(initialState, 'fromServer')

const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
}))

app.use(webpackHotMiddleware(compiler))

app.get('*', (req, res) => {
    let context = {}
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App history={history} />
            </StaticRouter>
        </Provider>
    )

    const output = `
    <!DOCTYPE html>
     <html>
       <head>
         <meta charset="utf-8">
         <title>React Router v4</title>
       </head>
     <body>
       <div id="react-root">${html}</div>
       <script>	window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
       <script src="/dist/bundle.js"></script>
     </body>
    </html>`
    res.send(output)
})

app.listen(8080, (err) => {
    if (err) {
        return console.error(err) // eslint-disable-line no-console
    }
    console.log('Listening at http://localhost:8080') // eslint-disable-line no-console
})