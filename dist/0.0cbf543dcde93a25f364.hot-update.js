exports.id = 0;
exports.modules = {

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _babelPolyfill = __webpack_require__(4);
	
	var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(6);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _reactRouter = __webpack_require__(7);
	
	var _store = __webpack_require__(8);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _App = __webpack_require__(15);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _reactRedux = __webpack_require__(16);
	
	var _routes = __webpack_require__(21);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _url = __webpack_require__(25);
	
	var _url2 = _interopRequireDefault(_url);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var routes = _routes2.default;
	
	/**
	 * Create Redux store, and get intitial state.
	 */
	var store = (0, _store2.default)();
	var initialState = store.getState();
	console.log(initialState);
	/**
	 * Start Hapi server
	 */
	var envset = {
	  production: process.env.NODE_ENV === 'production'
	};
	
	var hostname = envset.production ? process.env.HOSTNAME || process['env'].HOSTNAME : "localhost";
	var port = envset.production ? process.env.PORT || process['env'].PORT : 8000;
	
	var server = express();
	server.listen(8080, function () {
	  console.log('Server listening on http://localhost:8000, Ctrl+C to stop');
	});
	/**
	 * Attempt to serve static requests from the public folder.
	 */
	// server.route({
	// 	method:  "GET",
	// 	path:    "/{params*}",
	// 	handler: {
	// 		file: (request) => "static" + request.path
	// 	}
	// });
	//
	// server.route({
	//     method: 'GET',
	//     path:'/hello',
	//     handler: function (request, reply) {
	//        var data = {
	//          message: "hello world from server"
	//        }
	//         return reply(data);
	//     }
	// });
	// /**
	//  * Catch dynamic requests here to fire-up React Router.
	//  */
	// server.ext("onPreResponse", (request, reply) => {
	// 	if (typeof request.response.statusCode !== "undefined") {
	//     return reply.continue();
	//   }
	//
	//   match({routes, location: request.path}, (error, redirectLocation, renderProps) => {
	//     if (redirectLocation) {
	//       reply.redirect(redirectLocation.pathname + redirectLocation.search);
	//       return;
	//     }
	//     if (error || !renderProps) {
	//       reply.continue();
	//       return;
	//     }
	// 	const reactString = ReactDOM.renderToString(
	// 		<Provider store={store}>
	//       <RouterContext {...renderProps} />
	// 		</Provider>
	// 	);
	// 	const webserver = __PRODUCTION__ ? "" : `//${hostname}:8080`;
	// 	let output = (
	// 		`<!doctype html>
	// 		<html lang="en-us">
	// 			<head>
	// 				<meta charset="utf-8">
	// 				<title></title>
	// 			</head>
	// 			<body>
	// 				<div id="react-root">${reactString}</div>
	// 				<script>
	// 					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
	// 				</script>
	// 				<script src=${webserver}/dist/client.js></script>
	// 			</body>
	// 		</html>`
	// 		);
	// 	reply(output);
	//   });
	// });
	
	
	server.use(function (req, res) {
	  var memoryHistory = createMemoryHistory(req.url);
	  var store = (0, _store2.default)(memoryHistory);
	  var history = syncHistoryWithStore(memoryHistory, store);
	  var output = "<!doctype html>\n\t\t<html lang=\"en-us\">\n\t\t\t<head>\n\t\t\t\t<meta charset=\"utf-8\">\n\t\t\t\t<title></title>\n\t\t\t</head>\n\t\t\t<body>\n\t\t\t\t<div id=\"react-root\">" + reactString + "</div>\n\t\t\t\t<script>\n\t\t\t\t\twindow.__INITIAL_STATE__ = " + JSON.stringify(initialState) + "\n\t\t\t\t</script>\n\t\t\t\t<script src=" + webserver + "/dist/client.js></script>\n\t\t\t</body>\n\t\t</html>";
	  (0, _reactRouter.match)({ history: history, routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
	    if (error) {
	      res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {
	      var content = renderToString(_react2.default.createElement(
	        _reactRedux.Provider,
	        { store: store },
	        _react2.default.createElement(_reactRouter.RouterContext, renderProps)
	      ));
	      res.send(renderToString(output));
	    }
	  });
	});
	
	if (true) {
	  if (true) {
	    console.log("[HMR] Waiting for server-side updates");
	
	    module.hot.accept(21, function () {
	      routes = __webpack_require__(21);
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
//# sourceMappingURL=0.0cbf543dcde93a25f364.hot-update.js.map