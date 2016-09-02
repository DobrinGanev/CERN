exports.id = 0;
exports.modules = {

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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var serverConfig = __webpack_require__(26);
	
	//https://github.com/KillrVideo/killrvideo-nodejs
	var cassandra = exports.cassandra = _bluebird2.default.promisifyAll(new _cassandraDriver.Client({
	  contactPoints: serverConfig.contactPoints,
	  queryOptions: {
	    prepare: true
	  }
	}));

/***/ }

};
//# sourceMappingURL=0.56715a22dd079ea2bf40.hot-update.js.map