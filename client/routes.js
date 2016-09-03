import React from 'react';
import { Router, Route } from 'react-router';
import App from './containers/App';
import Home from './components/Home';
import Foo from './components/Foo';
import Bar from './components/Bar';


/**
 * The React Routes for both the server and the client.
 */

module.exports = (
	<Router>
		<Route component={App}>
			<Route path="/" component={Home}/>
			<Route path="foo" component={Foo}/>
			<Route path="bar" component={Bar}/>
		</Route>
	</Router>
);
