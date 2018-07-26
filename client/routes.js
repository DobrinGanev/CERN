import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import Home from './components/Home'
import Foo from './components/Foo'
import Grid from './baseComponents/Grid'

/**
 * The React Routes for both the server and the client.
 */

module.exports = (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="foo" component={Foo} />
    <Route path="bar" component={() => <Grid hello="world" />} />
  </Route>
)
