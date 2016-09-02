exports.id = 0;
exports.modules = {

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	var _reactRedux = __webpack_require__(16);
	
	var _routes = __webpack_require__(17);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _url = __webpack_require__(25);
	
	var _url2 = _interopRequireDefault(_url);
	
	var _config = __webpack_require__(26);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _cassandra = __webpack_require__(30);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(27).config();
	
	var routes = _routes2.default;
	
	var server = (0, _express2.default)();
	server.listen(_config2.default.port, function (error) {
			if (!error) {
					console.log('CERN is running on port: ' + _config2.default.port + '! Build something disruptive!'); // eslint-disable-line
			}
	});
	
	// var cassandra = require('cassandra-driver');
	// var client = new cassandra.Client({ contactPoints: ['127.0.0.1']});
	/*
	Sample schema
	https://github.com/pmcfadin/cassandra-videodb-sample-schema
	*/
	__webpack_require__(29)(_cassandra.cassandra);
	
	//test
	server.get('/hello', function (req, res) {
			var data = [];
			data.push({
					message: "Updated message from server: Hello world from  the server"
			});
			//for effect to see the update of the state
			setTimeout(function () {
					res.send(data);
			}, 3000);
	});
	
	var envset = {
			production: process.env.NODE_ENV === 'production'
	};
	var hostname = envset.production ? process.env.HOSTNAME || process['env'].HOSTNAME : "localhost";
	
	/**
	 * Create Redux store, and get intitial state.
	 */
	var store = (0, _store2.default)();
	var initialState = store.getState();
	server.use(function (req, res, next) {
			(0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
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
					var webserver =  false ? "" : '//' + hostname + ':8080';
					var output = '<!doctype html>\n\t\t<html lang="en-us">\n\t\t\t<head>\n\t\t\t\t<meta charset="utf-8">\n\t\t\t\t<title></title>\n\t\t\t</head>\n\t\t\t<body>\n\t\t\t\t<div id="react-root">' + reactString + '</div>\n\t\t\t\t<script>\n\t\t\t\t\twindow.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + '\n\t\t\t\t</script>\n\t\t\t\t<script src=' + webserver + '/dist/client.js></script>\n\t\t\t</body>\n\t\t</html>';
					res.send(output);
			});
	});
	
	if (true) {
			if (true) {
					console.log("[HMR] Waiting for server-side updates");
	
					module.hot.accept(17, function () {
							routes = __webpack_require__(17);
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

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cassandra = undefined;
	
	var _cassandraDriver = __webpack_require__(28);
	
	var _bluebird = __webpack_require__(31);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _config = __webpack_require__(26);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//https://github.com/KillrVideo/killrvideo-nodejs
	var cassandra = exports.cassandra = _bluebird2.default.promisifyAll(new _cassandraDriver.Client({
	  contactPoints: _config2.default.contactPoints,
	  queryOptions: {
	    prepare: true
	  }
	}));

/***/ },

/***/ 31:
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ }

};
//# sourceMappingURL=0.e25333b0739e6b0efb0b.hot-update.js.map