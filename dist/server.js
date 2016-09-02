/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return callback();
/******/ 		}
/******/ 		callback(null, update);
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "863e9949485be998b72c"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8080/dist";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals __resourceQuery */
	if(true) {
		var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);
	
		function checkForUpdate(fromUpdate) {
			if(module.hot.status() === "idle") {
				module.hot.check(true, function(err, updatedModules) {
					if(err) {
						if(module.hot.status() in {
								abort: 1,
								fail: 1
							}) {
							console.warn("[HMR] Cannot apply update.");
							console.warn("[HMR] " + err.stack || err.message);
							console.warn("[HMR] You need to restart the application!");
						} else {
							console.warn("[HMR] Update failed: " + err.stack || err.message);
						}
						return;
					}
					if(!updatedModules) {
						if(fromUpdate) console.log("[HMR] Update applied.");
						return;
					}
					__webpack_require__(2)(updatedModules, updatedModules);
					checkForUpdate(true);
				});
			}
		}
		setInterval(checkForUpdate, hotPollInterval);
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?1000"))

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});
	
		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}
	
		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.default = function (initialState) {
		var finalCreateStore = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : function (f) {
			return f;
		})(_redux.createStore);
	
		var store = finalCreateStore(_reducers2.default, initialState);
		if (true) {
			// Enable Webpack hot module replacement for reducers
			module.hot.accept(10, function () {
				var nextRootReducer = __webpack_require__(10).default;
				store.replaceReducer(nextRootReducer);
			});
		}
	
		return store;
	};
	
	var _redux = __webpack_require__(11);
	
	var _reduxThunk = __webpack_require__(15);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reducers = __webpack_require__(10);
	
	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(11);
	
	var _message = __webpack_require__(12);
	
	var _message2 = _interopRequireDefault(_message);
	
	var _reactRouterRedux = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var rootReducer = (0, _redux.combineReducers)({
	  message: _message2.default,
	  routing: _reactRouterRedux.routerReducer
	});
	
	exports.default = rootReducer;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = message;
	
	var _actionTypes = __webpack_require__(13);
	
	var messages = [];
	messages.push({
		message: "Initial state message: Hello"
	});
	var initialState = {
		messages: messages,
		isLoading: true
	};
	
	console.log(initialState);
	function message() {
		var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
		var action = arguments[1];
	
		switch (action.type) {
			case _actionTypes.MESSAGE_FETCH:
				return Object.assign({}, state, {
					messages: action.messages,
					isLoading: action.isLoading
				});
			case _actionTypes.MESSAGE_STOP_FETCH:
				return Object.assign({}, state, {
					isLoading: action.isLoading
				});
			default:
				return state;
		}
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MESSAGE_FETCH = exports.MESSAGE_FETCH = 'MESSAGE_FETCH';
	var MESSAGE_STOP_FETCH = exports.MESSAGE_STOP_FETCH = 'MESSAGE_STOP_FETCH';

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("react-router-redux");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(8);
	
	var _App = __webpack_require__(18);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _Home = __webpack_require__(22);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _Foo = __webpack_require__(23);
	
	var _Foo2 = _interopRequireDefault(_Foo);
	
	var _Bar = __webpack_require__(24);
	
	var _Bar2 = _interopRequireDefault(_Bar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * The React Routes for both the server and the client.
	 */
	
	module.exports = _react2.default.createElement(
		_reactRouter.Router,
		null,
		_react2.default.createElement(
			_reactRouter.Route,
			{ component: _App2.default },
			_react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: 'foo', component: _Foo2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: 'bar', component: _Bar2.default })
		)
	);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.App = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(16);
	
	var _messageActions = __webpack_require__(19);
	
	var _reactRouter = __webpack_require__(8);
	
	var _Message = __webpack_require__(21);
	
	var _Message2 = _interopRequireDefault(_Message);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var App = exports.App = function (_Component) {
	  _inherits(App, _Component);
	
	  function App(props) {
	    _classCallCheck(this, App);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));
	  }
	
	  _createClass(App, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _messageActions.fetchMessage)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'header',
	          null,
	          'Links:',
	          ' ',
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/' },
	            'Home'
	          ),
	          ' ',
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/foo' },
	            'Foo'
	          ),
	          ' ',
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/bar' },
	            'Bar'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'h2',
	            null,
	            'App'
	          ),
	          _react2.default.createElement(_Message2.default, { messages: this.props.messages }),
	          this.props.children
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          'Loading : ',
	          this.props.isLoading.toString()
	        )
	      );
	    }
	  }]);
	
	  return App;
	}(_react.Component);
	
	App.propTypes = {
	  dispatch: _react.PropTypes.func.isRequired,
	  messages: _react.PropTypes.array.isRequired,
	  isLoading: _react.PropTypes.bool.isRequired
	};
	
	// Retrieve data from store as props
	function mapStateToProps(state) {
	  var _isLoading$messages = {
	    isLoading: state.message.isLoading,
	    messages: state.message.messages
	  };
	  var messages = _isLoading$messages.messages;
	  var isLoading = _isLoading$messages.isLoading;
	
	  return {
	    messages: messages,
	    isLoading: isLoading
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.fetchMessage = fetchMessage;
	
	var _isomorphicFetch = __webpack_require__(20);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _actionTypes = __webpack_require__(13);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function receiveMessage(json) {
		return {
			type: _actionTypes.MESSAGE_FETCH,
			messages: json,
			isLoading: true
		};
	}
	
	function stopFetch() {
		return {
			type: _actionTypes.MESSAGE_STOP_FETCH,
			isLoading: false
		};
	}
	
	function fetchMessage() {
		return function (dispatch) {
			return (0, _isomorphicFetch2.default)('/hello').then(function (response) {
				return response.json();
			}).then(function (json) {
				return dispatch(receiveMessage(json));
			}).then(function () {
				dispatch(stopFetch());
			});
		};
	}

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Message = function Message(_ref) {
	  var messages = _ref.messages;
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'ul',
	      null,
	      messages.map(function (m, i) {
	        return _react2.default.createElement(
	          'li',
	          { key: i },
	          m.message
	        );
	      })
	    )
	  );
	};
	
	Message.propTypes = {
	  messages: _react2.default.PropTypes.any
	};
	exports.default = Message;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Home = function Home() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'h2',
	      null,
	      'Home'
	    )
	  );
	};
	
	exports.default = Home;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Foo = function Foo(_ref) {
	    var children = _ref.children;
	    return _react2.default.createElement(
	        "div",
	        { className: "Foo" },
	        _react2.default.createElement(
	            "h2",
	            null,
	            "Foo"
	        ),
	        children
	    );
	};
	
	Foo.propTypes = {
	    children: _react2.default.PropTypes.any
	};
	exports.default = Foo;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Bar = function Bar() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'h2',
	      null,
	      'Bar'
	    )
	  );
	};
	
	exports.default = Bar;

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  contactPoints: process.env.CASSANDRA_CONTACT_POINTS || ['127.0.0.1'],
	  port: process.env.PORT || 3000
	};
	
	exports.default = config;

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("cassandra-driver");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*
	ref: https://github.com/pmcfadin/cassandra-videodb-sample-schema
	*/
	var keyspace = "CREATE KEYSPACE IF NOT EXISTS killrvideo WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };";
	var tables = [
	
	// User credentials, keyed by email address so we can authenticate
	// Seperated from user in case auth is external (Google, Facebook, etc...)
	'CREATE TABLE IF NOT EXISTS killrvideo.user_credentials (' + 'email text,' + 'password text,' + 'userid uuid,' + 'PRIMARY KEY (email));',
	// Basic entity table for a user
	// UUID for userid to link to auth system
	
	'CREATE TABLE IF NOT EXISTS killrvideo.users (' + 'userid uuid,' + 'firstname varchar,' + 'lastname varchar,' + 'email text,' + 'created_date timestamp,' + 'PRIMARY KEY (userid) );',
	
	// Entity table that will store many videos for a unique user
	// Meta data - Height, Width, Bit rate, Encoding
	// Map thumbnails - stop, url
	// Selected thumbnail
	
	'CREATE TABLE IF NOT EXISTS killrvideo.videos (' + 'videoid uuid,' + 'userid uuid,' + 'name varchar,' + 'description varchar,' + 'location text,' + 'location_type int,' +
	// <position in video, url of thumbnail>
	'preview_thumbnails map<text,text>,  ' + 'tags set<varchar>,' + 'added_date timestamp,' + 'PRIMARY KEY (videoid) );',
	
	// One-to-many from the user point of view
	// Also know as a lookup table
	'CREATE TABLE IF NOT EXISTS killrvideo.user_videos (' + 'userid uuid,' + 'added_date timestamp,' + 'videoid uuid,' + 'name text,' + 'preview_image_location text,' + 'PRIMARY KEY (userid, added_date, videoid)' + ') WITH CLUSTERING ORDER BY (added_date DESC, videoid ASC);',
	
	// Track latest videos, grouped by day (if we ever develop a bad hotspot from the daily grouping here, we could mitigate by
	// splitting the row using an arbitrary group number, making the partition key (yyyymmdd, group_number))
	'CREATE TABLE IF NOT EXISTS killrvideo.latest_videos (' + 'yyyymmdd text,' + 'added_date timestamp,' + 'videoid uuid,' + 'name text,' + 'preview_image_location text,' + 'PRIMARY KEY (yyyymmdd, added_date, videoid)' + ') WITH CLUSTERING ORDER BY (added_date DESC, videoid ASC);',
	
	// Counter table
	'CREATE TABLE IF NOT EXISTS killrvideo.video_rating (' + 'videoid uuid,' + 'rating_counter counter,' + 'rating_total counter,' + 'PRIMARY KEY (videoid));',
	
	// Video ratings by user (to try and mitigate voting multiple times)
	'CREATE TABLE IF NOT EXISTS killrvideo.video_ratings_by_user (' + 'videoid uuid,' + 'userid uuid,' + 'rating int,' + 'PRIMARY KEY (videoid, userid));',
	
	// Index for tag keywords
	'CREATE TABLE IF NOT EXISTS killrvideo.videos_by_tag (' + 'tag text,' + 'videoid uuid,' + 'added_date timestamp,' + 'name text,' + 'preview_image_location text,' + 'tagged_date timestamp,' + 'PRIMARY KEY (tag, videoid));',
	
	// Inverted index for tags by first letter in the tag
	'CREATE TABLE IF NOT EXISTS killrvideo.tags_by_letter (' + 'first_letter text,' + 'tag text,' + 'PRIMARY KEY (first_letter, tag));',
	
	// Comments as a many-to-many
	// Looking from the video side to many users
	'CREATE TABLE IF NOT EXISTS killrvideo.comments_by_video (' + 'videoid uuid,' + 'commentid timeuuid,' + 'userid uuid,' + 'comment text,' + 'PRIMARY KEY (videoid, commentid)' + ') WITH CLUSTERING ORDER BY (commentid DESC);',
	
	// looking from the user side to many videos
	'CREATE TABLE IF NOT EXISTS killrvideo.comments_by_user (' + 'userid uuid,' + 'commentid timeuuid,' + 'videoid uuid,' + 'comment text,' + 'PRIMARY KEY (userid, commentid)' + ') WITH CLUSTERING ORDER BY (commentid DESC);',
	
	// Time series wide row with reverse comparator
	'CREATE TABLE IF NOT EXISTS killrvideo.video_event (' + 'videoid uuid,' + 'userid uuid,' + 'event varchar,' + 'event_timestamp timeuuid,' + 'video_timestamp bigint,' + 'PRIMARY KEY ((videoid,userid),event_timestamp,event)' + ') WITH CLUSTERING ORDER BY (event_timestamp DESC,event ASC);'];
	
	var async = __webpack_require__(32);
	module.exports = function (client) {
	  /**
	   * CREATE keyspace IF NOT EXISTS statement
	   * @param {string} keyspace - List of tables.
	   */
	  (function () {
	    client.execute(keyspace, function (err) {
	      if (err) {
	        console.log(err);
	      } else {
	        /**
	         * When successfully created create all tables.
	         */
	        createTables();
	      }
	    });
	  })();
	
	  var createTables = function createTables() {
	    return (
	      /**
	       * CREATE keyspace IF NOT EXISTS statement
	       * @param {array} tables - List of create table statements.
	       */
	      async.each(tables, function (table, callback) {
	        client.execute(table, function (err) {
	          if (err) {
	            console.log(err);
	          }
	          callback();
	        });
	      }, function (err) {
	        if (err) {
	          console.log(err);
	        } else {
	          console.log('done creating keyspace and tables');
	          __webpack_require__(33)(client);
	        }
	      })
	    );
	  };
	};

/***/ },
/* 30 */
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
/* 31 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("async");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/*
	each time the application is restarted the data will be truncated and re-inserted
	you can also manually create the data using cql scripts
	ref: https://github.com/pmcfadin/cassandra-videodb-sample-schema
	*/
	
	//User_credentials
	var user_credentials = [];
	user_credentials.push("INSERT INTO killrvideo.user_credentials (userid,  email, password)" + "VALUES (d0f60aa8-54a9-4840-b70c-fe562b68842b,'tcodd@relational.com','5f4dcc3b5aa765d61d8327deb882cf99');");
	
	user_credentials.push("INSERT INTO killrvideo.user_credentials (userid,  email, password)" + "VALUES (522b1fe2-2e36-4cef-a667-cd4237d08b89,'cdate@relational.com','6cb75f652a9b52798eb6cf2201057c73');");
	
	user_credentials.push("INSERT INTO killrvideo.user_credentials (userid,  email, password)" + "VALUES (9761d3d7-7fbd-4269-9988-6cfd4e188678,'patrick@datastax.com','ba27e03fd95e507daf2937c937d499ab');");
	
	//Users
	var users = [];
	users.push("INSERT INTO killrvideo.users (userid, firstname, lastname, email, created_date)" + "VALUES (d0f60aa8-54a9-4840-b70c-fe562b68842b,'Ted','Codd', 'tcodd@relational.com','2011-06-01 08:00:00');");
	
	users.push("INSERT INTO killrvideo.users (userid, firstname, lastname, email, created_date)" + "VALUES (522b1fe2-2e36-4cef-a667-cd4237d08b89,'Chris','Date', 'cdate@relational.com','2011-06-20 13:50:00');");
	
	users.push("INSERT INTO killrvideo.users (userid, firstname, lastname, email, created_date)" + "VALUES (9761d3d7-7fbd-4269-9988-6cfd4e188678,'Patrick','McFadin', 'patrick@datastax.com','2011-06-20 13:50:00');");
	
	//Videos
	var videos = [];
	videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" + "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,'My funny cat',d0f60aa8-54a9-4840-b70c-fe562b68842b, 'My cat likes to play the piano! So funny.','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401',1,{'10':'/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401'},{'cats','piano','lol'},'2012-06-01 08:00:00');");
	
	videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" + "VALUES (b3a76c6b-7c7f-4af6-964f-803a9283c401,'Now my dog plays piano!',d0f60aa8-54a9-4840-b70c-fe562b68842b, 'My dog learned to play the piano because of the cat.','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401',1,{'10':'/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401'},{'dogs','piano','lol'},'2012-08-30 16:50:00');");
	
	videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" + "VALUES (0c3f7e87-f6b6-41d2-9668-2b64d117102c,'An Introduction to Database Systems',522b1fe2-2e36-4cef-a667-cd4237d08b89, 'An overview of my book','/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c',1,{'10':'/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c'},{'database','relational','book'},'2012-09-03 10:30:00');");
	
	videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" + "VALUES (416a5ddc-00a5-49ed-adde-d99da9a27c0c,'Intro to CAP theorem',522b1fe2-2e36-4cef-a667-cd4237d08b89, 'I think there might be something to this.','/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c',1,{'10':'/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c'},{'database','cap','brewer'},'2012-12-01 11:29:00');");
	
	videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" + "VALUES (06049cbb-dfed-421f-b889-5f649a0de1ed,'The data model is dead. Long live the data model.',9761d3d7-7fbd-4269-9988-6cfd4e188678, 'First in a three part series for Cassandra Data Modeling','http://www.youtube.com/watch?v=px6U2n74q3g',1,{'YouTube':'http://www.youtube.com/watch?v=px6U2n74q3g'},{'cassandra','data model','relational','instruction'},'2013-05-02 12:30:29');");
	
	videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" + "VALUES (873ff430-9c23-4e60-be5f-278ea2bb21bd,'Become a Super Modeler',9761d3d7-7fbd-4269-9988-6cfd4e188678, 'Second in a three part series for Cassandra Data Modeling','http://www.youtube.com/watch?v=qphhxujn5Es',1,{'YouTube':'http://www.youtube.com/watch?v=qphhxujn5Es'},{'cassandra','data model','cql','instruction'},'2013-05-16 16:50:00');");
	
	videos.push("INSERT INTO killrvideo.videos (videoid, name, userid, description, location, location_type, preview_thumbnails, tags, added_date)" + "VALUES (49f64d40-7d89-4890-b910-dbf923563a33,'The World''s Next Top Data Model',9761d3d7-7fbd-4269-9988-6cfd4e188678, 'Third in a three part series for Cassandra Data Modeling','http://www.youtube.com/watch?v=HdJlsOZVGwM',1,{'YouTube':'http://www.youtube.com/watch?v=HdJlsOZVGwM'},{'cassandra','data model','examples','instruction'},'2013-06-11 11:00:00');");
	
	// user_videos - Every video a user uploads is indexed into a single partition by username
	var user_videos = [];
	user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" + "VALUES (d0f60aa8-54a9-4840-b70c-fe562b68842b,99051fe9-6a9c-46c2-b949-38ef78858dd0,'2012-06-01 08:00:00','My funny cat','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");
	
	user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" + "VALUES (d0f60aa8-54a9-4840-b70c-fe562b68842b,b3a76c6b-7c7f-4af6-964f-803a9283c401,'2012-08-30 16:50:00','Now my dog plays piano!','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");
	
	user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" + "VALUES (522b1fe2-2e36-4cef-a667-cd4237d08b89,0c3f7e87-f6b6-41d2-9668-2b64d117102c,'2013-05-02 12:30:29','An Introduction to Database Systems','/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c');");
	
	user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" + "VALUES (522b1fe2-2e36-4cef-a667-cd4237d08b89,416a5ddc-00a5-49ed-adde-d99da9a27c0c,'2012-12-01 11:29:00','Intro to CAP theorem','/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c');");
	
	user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" + "VALUES (9761d3d7-7fbd-4269-9988-6cfd4e188678,06049cbb-dfed-421f-b889-5f649a0de1ed,'2013-05-02 12:30:29','The data model is dead. Long live the data model.','http://www.youtube.com/watch?v=px6U2n74q3g');");
	
	user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" + "VALUES (9761d3d7-7fbd-4269-9988-6cfd4e188678,873ff430-9c23-4e60-be5f-278ea2bb21bd,'2013-05-16 16:50:00','Become a Super Modeler','http://www.youtube.com/watch?v=qphhxujn5Es');");
	
	user_videos.push("INSERT INTO killrvideo.user_videos (userid, videoid, added_date, name, preview_image_location)" + "VALUES (9761d3d7-7fbd-4269-9988-6cfd4e188678,49f64d40-7d89-4890-b910-dbf923563a33,'2013-06-11 11:00:00','The World''s Next Top Data Model','http://www.youtube.com/watch?v=HdJlsOZVGwM');");
	
	//latest_videos
	var latest_videos = [];
	latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" + "VALUES ('2012-06-01',99051fe9-6a9c-46c2-b949-38ef78858dd0,'2012-06-01 08:00:00','My funny cat','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");
	
	latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" + "VALUES ('2012-08-30',b3a76c6b-7c7f-4af6-964f-803a9283c401,'2012-08-30 16:50:00','Now my dog plays piano!','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");
	
	latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" + "VALUES ('2013-05-02',0c3f7e87-f6b6-41d2-9668-2b64d117102c,'2013-05-02 12:30:29','An Introduction to Database Systems','/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c');");
	
	latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" + "VALUES ('2012-12-01',416a5ddc-00a5-49ed-adde-d99da9a27c0c,'2012-12-01 11:29:00','Intro to CAP theorem','/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c');");
	
	latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" + "VALUES ('2013-05-02',06049cbb-dfed-421f-b889-5f649a0de1ed,'2013-05-02 12:30:29','The data model is dead. Long live the data model.','http://www.youtube.com/watch?v=px6U2n74q3g');");
	
	latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" + "VALUES ('2013-05-16',873ff430-9c23-4e60-be5f-278ea2bb21bd,'2013-05-16 16:50:00','Become a Super Modeler','http://www.youtube.com/watch?v=qphhxujn5Es');");
	
	latest_videos.push("INSERT INTO killrvideo.latest_videos (yyyymmdd, videoid, added_date, name, preview_image_location)" + "VALUES ('2013-06-11',49f64d40-7d89-4890-b910-dbf923563a33,'2013-06-11 11:00:00','The World''s Next Top Data Model','http://www.youtube.com/watch?v=HdJlsOZVGwM');");
	
	// Video Rating counters
	var video_rating_update = [];
	video_rating_update.push("UPDATE killrvideo.video_rating SET rating_counter = rating_counter + 1, rating_total = rating_total + 3 " + "WHERE videoid = 99051fe9-6a9c-46c2-b949-38ef78858dd0;");
	
	video_rating_update.push("UPDATE killrvideo.video_rating SET rating_counter = rating_counter + 1, rating_total = rating_total + 5 " + "WHERE videoid = 99051fe9-6a9c-46c2-b949-38ef78858dd0;");
	
	video_rating_update.push("UPDATE killrvideo.video_rating SET rating_counter = rating_counter + 1, rating_total = rating_total + 4 " + "WHERE videoid = 99051fe9-6a9c-46c2-b949-38ef78858dd0;");
	
	// video_ratings_by_user
	var video_ratings_by_user = [];
	video_ratings_by_user.push("INSERT INTO killrvideo.video_ratings_by_user (videoid, userid, rating)" + "VALUES ( 99051fe9-6a9c-46c2-b949-38ef78858dd0,9761d3d7-7fbd-4269-9988-6cfd4e188678 ,3);");
	
	video_ratings_by_user.push("INSERT INTO killrvideo.video_ratings_by_user (videoid, userid, rating)" + "VALUES ( 99051fe9-6a9c-46c2-b949-38ef78858dd0,9761d3d7-7fbd-4269-9988-6cfd4e188678 ,5);");
	
	video_ratings_by_user.push("INSERT INTO killrvideo.video_ratings_by_user (videoid, userid, rating)" + "VALUES ( 99051fe9-6a9c-46c2-b949-38ef78858dd0,9761d3d7-7fbd-4269-9988-6cfd4e188678 ,4);");
	
	// videos_by_tag
	var videos_by_tag = [];
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('cats',99051fe9-6a9c-46c2-b949-38ef78858dd0,'2012-05-25 08:30:29','2012-06-01 08:00:00','My funny cat','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('piano',99051fe9-6a9c-46c2-b949-38ef78858dd0, '2012-05-25 08:30:29','2012-06-01 08:00:00','My funny cat','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('lol',99051fe9-6a9c-46c2-b949-38ef78858dd0, '2012-05-25 08:30:29','2012-06-01 08:00:00','My funny cat','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('dogs',b3a76c6b-7c7f-4af6-964f-803a9283c401, '2012-08-30 16:50:00','2012-08-30 16:50:00','Now my dog plays piano!','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('piano',b3a76c6b-7c7f-4af6-964f-803a9283c401, '2012-08-30 16:50:00','2012-08-30 16:50:00','Now my dog plays piano!','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('lol',b3a76c6b-7c7f-4af6-964f-803a9283c401, '2012-08-30 16:50:00','2012-08-30 16:50:00','Now my dog plays piano!','/us/vid/b3/b3a76c6b-7c7f-4af6-964f-803a9283c401');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('database',0c3f7e87-f6b6-41d2-9668-2b64d117102c, '2012-09-03 10:30:00','2013-05-02 12:30:29','An Introduction to Database Systems','/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('relational',0c3f7e87-f6b6-41d2-9668-2b64d117102c, '2012-09-03 10:30:00','2013-05-02 12:30:29','An Introduction to Database Systems','/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('book',0c3f7e87-f6b6-41d2-9668-2b64d117102c, '2012-09-03 10:30:00','2013-05-02 12:30:29','An Introduction to Database Systems','/us/vid/0c/0c3f7e87-f6b6-41d2-9668-2b64d117102c');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('database',416a5ddc-00a5-49ed-adde-d99da9a27c0c, '2012-12-01 11:29:00','2012-12-01 11:29:00','Intro to CAP theorem','/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('cap',416a5ddc-00a5-49ed-adde-d99da9a27c0c, '2012-12-01 11:29:00','2012-12-01 11:29:00','Intro to CAP theorem','/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('brewer',416a5ddc-00a5-49ed-adde-d99da9a27c0c, '2012-12-01 11:29:00','2012-12-01 11:29:00','Intro to CAP theorem','/us/vid/41/416a5ddc-00a5-49ed-adde-d99da9a27c0c');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('cassandra',06049cbb-dfed-421f-b889-5f649a0de1ed, '2013-05-02 12:30:29','2013-05-02 12:30:29','The data model is dead. Long live the data model.','http://www.youtube.com/watch?v=px6U2n74q3g');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('data model',06049cbb-dfed-421f-b889-5f649a0de1ed, '2013-05-02 12:30:29','2013-05-02 12:30:29','The data model is dead. Long live the data model.','http://www.youtube.com/watch?v=px6U2n74q3g');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('relational',06049cbb-dfed-421f-b889-5f649a0de1ed, '2013-05-02 12:30:29','2013-05-02 12:30:29','The data model is dead. Long live the data model.','http://www.youtube.com/watch?v=px6U2n74q3g');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('instruction',06049cbb-dfed-421f-b889-5f649a0de1ed, '2013-05-02 12:30:29','2013-05-02 12:30:29','The data model is dead. Long live the data model.','http://www.youtube.com/watch?v=px6U2n74q3g');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('cassandra',873ff430-9c23-4e60-be5f-278ea2bb21bd, '2013-05-16 16:50:00','2013-05-16 16:50:00','Become a Super Modeler','http://www.youtube.com/watch?v=qphhxujn5Es');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('data model',873ff430-9c23-4e60-be5f-278ea2bb21bd, '2013-05-16 16:50:00','2013-05-16 16:50:00','Become a Super Modeler','http://www.youtube.com/watch?v=qphhxujn5Es');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('relational',873ff430-9c23-4e60-be5f-278ea2bb21bd, '2013-05-16 16:50:00','2013-05-16 16:50:00','Become a Super Modeler','http://www.youtube.com/watch?v=qphhxujn5Es');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('instruction',873ff430-9c23-4e60-be5f-278ea2bb21bd, '2013-05-16 16:50:00','2013-05-16 16:50:00','Become a Super Modeler','http://www.youtube.com/watch?v=qphhxujn5Es');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('cassandra',49f64d40-7d89-4890-b910-dbf923563a33, '2013-06-11 11:00:00','2013-06-11 11:00:00','The World''s Next Top Data Model','http://www.youtube.com/watch?v=HdJlsOZVGwM');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('data model',49f64d40-7d89-4890-b910-dbf923563a33, '2013-06-11 11:00:00','2013-06-11 11:00:00','The World''s Next Top Data Model','http://www.youtube.com/watch?v=HdJlsOZVGwM');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('examples',49f64d40-7d89-4890-b910-dbf923563a33, '2013-06-11 11:00:00','2013-06-11 11:00:00','The World''s Next Top Data Model','http://www.youtube.com/watch?v=HdJlsOZVGwM');");
	
	videos_by_tag.push("INSERT INTO killrvideo.videos_by_tag (tag, videoid, tagged_date, added_date, name, preview_image_location)" + "VALUES ('instruction',49f64d40-7d89-4890-b910-dbf923563a33, '2013-06-11 11:00:00','2013-06-11 11:00:00','The World''s Next Top Data Model','http://www.youtube.com/watch?v=HdJlsOZVGwM');");
	
	// Video Comments. One for each side of the view.
	// Insert in pairs
	// This is done using the batch command to group our operations.
	var comments_by_video = [];
	comments_by_video.push("BEGIN BATCH " + "INSERT INTO killrvideo.comments_by_video (videoid, userid, commentid, comment)" + "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,d0f60aa8-54a9-4840-b70c-fe562b68842b,now(), 'Worst. Video. Ever.')" + "INSERT INTO killrvideo.comments_by_video (videoid, userid, commentid, comment)" + "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,d0f60aa8-54a9-4840-b70c-fe562b68842b,now(), 'Worst. Video. Ever.')" + "APPLY BATCH;");
	
	comments_by_video.push("BEGIN BATCH " + "INSERT INTO killrvideo.comments_by_video (videoid, userid, commentid, comment) " + "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,522b1fe2-2e36-4cef-a667-cd4237d08b89,now(), 'It is amazing') " + "INSERT INTO killrvideo.comments_by_video (videoid, userid, commentid, comment) " + "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,522b1fe2-2e36-4cef-a667-cd4237d08b89,now(), 'It is amazing') " + "APPLY BATCH;");
	
	// Video events
	var video_event = [];
	video_event.push("INSERT INTO killrvideo.video_event (videoid, userid, event, event_timestamp, video_timestamp) " + "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,d0f60aa8-54a9-4840-b70c-fe562b68842b,'start',now(),0);");
	video_event.push("INSERT INTO killrvideo.video_event (videoid, userid, event, event_timestamp, video_timestamp)" + "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,d0f60aa8-54a9-4840-b70c-fe562b68842b,'stop',now(),30000);");
	video_event.push("INSERT INTO killrvideo.video_event (videoid, userid, event, event_timestamp, video_timestamp)" + "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,d0f60aa8-54a9-4840-b70c-fe562b68842b,'start',now(),3000);");
	video_event.push("INSERT INTO killrvideo.video_event (videoid, userid, event, event_timestamp, video_timestamp)" + "VALUES (99051fe9-6a9c-46c2-b949-38ef78858dd0,d0f60aa8-54a9-4840-b70c-fe562b68842b,'stop',now(),230000);");
	
	var async = __webpack_require__(32);
	var tables = ["user_credentials", "users", "videos", "user_videos", "latest_videos", "video_rating", "video_ratings_by_user", "videos_by_tag", "tags_by_letter", "comments_by_video", "comments_by_user", "video_event"];
	
	module.exports = function (client) {
	  /**
	   * TRUNCATE tables then insert the data.this will run everytime the server is restarted
	   * @param {array} tables - List of tables.
	   */
	  (function () {
	    async.each(tables, function (table, callback) {
	      client.execute("TRUNCATE TABLE killrvideo." + table + ";", function (err) {
	        if (err) {
	          console.log(err);
	        }
	        console.log("truncated table " + table);
	        callback();
	      });
	    }, function (err) {
	      if (err) {
	        console.log(err);
	      } else {
	        console.log('done truncating tables');
	        /**
	         * Insert all the data
	         * @param {array} user_credentials -List of insert statements. table user_credentials.
	         * @param {array} users -List of insert statements. table users.
	         * @param {array} user_videos -List of insert statements.table user_videos.
	         * @param {array} latest_videos -List of insert statements.table latest_videos.
	         * @param {array} video_rating_update - List of insert statements.table video_rating_update.
	         * @param {array} video_ratings_by_user - List of insert statements.table video_ratings_by_user.
	         * @param {array} videos_by_tag - List of insert statements.table videos_by_tag.
	         * @param {array} comments_by_video - List of insert statements.table comments_by_video.
	         * @param {array} video_event - List of insert statements .table video_event.
	         */
	        inserts(user_credentials);
	        inserts(users);
	        inserts(user_videos);
	        inserts(latest_videos);
	        inserts(video_rating_update);
	        inserts(video_ratings_by_user);
	        inserts(videos_by_tag);
	        inserts(comments_by_video);
	        inserts(video_event);
	      }
	    });
	  })();
	  /**
	   * TRUNCATE tables then insert statements the data.
	   * @param {array} inserts - List of insert statements .
	   */
	  var inserts = function inserts(_inserts) {
	    return async.each(_inserts, function (insert, callback) {
	      client.execute(insert, function (err) {
	        if (err) {
	          console.log(err);
	        }
	        callback();
	      });
	    }, function (err) {
	      if (err) {
	        console.log(err);
	      } else {
	        console.log('done inserting');
	      }
	    });
	  };
	};

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map