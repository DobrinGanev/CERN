exports.id = 0;
exports.modules = {

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _express = __webpack_require__(4);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _babelPolyfill = __webpack_require__(5);
	
	var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(7);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _reactRouter = __webpack_require__(8);
	
	var _store = __webpack_require__(9);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _App = __webpack_require__(16);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _reactRedux = __webpack_require__(17);
	
	var _routes = __webpack_require__(22);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _url = __webpack_require__(26);
	
	var _url2 = _interopRequireDefault(_url);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var routes = _routes2.default;
	
	/**
	 * Create Redux store, and get intitial state.
	 */
	
	var server = (0, _express2.default)();
	server.listen(8000, function () {
		console.log('Server listening on http://localhost:8000, Ctrl+C to stop');
	});
	
	server.get('/hello', function (req, res) {
		var data = {
			message: "hello world from server"
		};
		res.send(data);
	});
	
	var envset = {
		production: process.env.NODE_ENV === 'production'
	};
	var hostname = envset.production ? process.env.HOSTNAME || process['env'].HOSTNAME : "localhost";
	
	// server.use(function (req, res) {
	//   const store = configureStore();
	//   const initialState = store.getState();
	//   match({routes, location: req.url }, (error, redirectLocation, renderProps) => {
	//      if (renderProps) {
	//       const reactString = ReactDOM.renderToString(
	//   		<Provider store={store}>
	//         <RouterContext {...renderProps} />
	//   		</Provider>
	//   	);
	//   	const webserver = __PRODUCTION__ ? "" : `//${hostname}:8080`;
	//   	let output = (
	//   		`<!doctype html>
	//   		<html lang="en-us">
	//   			<head>
	//   				<meta charset="utf-8">
	//   				<title></title>
	//   			</head>
	//   			<body>
	//   				<div id="react-root">${reactString}</div>
	//   				<script>
	//   					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
	//   				</script>
	//   				<script src=${webserver}/dist/client.js></script>
	//   			</body>
	//   		</html>`
	//   		);
	//     }
	//   })
	// })
	server.use("*", function (request, res, next) {
		if (res.status(500)) {
			return next();
		}
	
		(0, _reactRouter.match)({ routes: routes, location: request.url }, function (error, redirectLocation, renderProps) {
			if (redirectLocation) {
				res.redirect(redirectLocation.pathname + redirectLocation.search);
				return;
			}
			if (error || !renderProps) {
				next();
				return;
			}
			var reactString = _server2.default.renderToString(_react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(_reactRouter.RouterContext, renderProps)
			));
			var webserver =  false ? "" : "//" + hostname + ":8080";
			var output = "<!doctype html>\n\t\t<html lang=\"en-us\">\n\t\t\t<head>\n\t\t\t\t<meta charset=\"utf-8\">\n\t\t\t\t<title></title>\n\t\t\t</head>\n\t\t\t<body>\n\t\t\t\t<div id=\"react-root\">" + reactString + "</div>\n\t\t\t\t<script>\n\t\t\t\t\twindow.__INITIAL_STATE__ = " + JSON.stringify(initialState) + "\n\t\t\t\t</script>\n\t\t\t\t<script src=" + webserver + "/dist/client.js></script>\n\t\t\t</body>\n\t\t</html>";
			res.send(datoutputa);
		});
	});
	
	if (true) {
		if (true) {
			console.log("[HMR] Waiting for server-side updates");
	
			module.hot.accept(22, function () {
				routes = __webpack_require__(22);
			});
	
			module.hot.addStatusHandler(function (status) {
				if (status === "abort") {
					setTimeout(function () {
						return process.exit(0);
					}, 0);
				}
			});
		}
	}

/***/ }

};
//# sourceMappingURL=0.83e25ed1bf86acaf6d5d.hot-update.js.map