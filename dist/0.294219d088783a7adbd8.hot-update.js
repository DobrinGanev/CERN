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
	var store = (0, _store2.default)();
	var initialState = store.getState();
	console.log(initialState);
	
	var server = (0, _express2.default)();
	server.listen(8000, function () {
			console.log('Server listening on http://localhost:8000, Ctrl+C to stop');
	});
	
	server.use(function (req, res) {
			var memoryHistory = (0, _reactRouter.createMemoryHistory)(req.url);
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
//# sourceMappingURL=0.294219d088783a7adbd8.hot-update.js.map