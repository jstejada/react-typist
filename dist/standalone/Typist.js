(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Typist"] = factory(require("react"));
	else
		root["Typist"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Cursor = __webpack_require__(2);

	var _Cursor2 = _interopRequireDefault(_Cursor);

	var _utils = __webpack_require__(4);

	var utils = _interopRequireWildcard(_utils);

	var Typist = (function (_Component) {
	  _inherits(Typist, _Component);

	  _createClass(Typist, null, [{
	    key: 'propTypes',
	    value: {
	      children: _react.PropTypes.node,
	      className: _react.PropTypes.string,
	      avgTypingDelay: _react.PropTypes.number,
	      stdTypingDelay: _react.PropTypes.number,
	      startDelay: _react.PropTypes.number,
	      cursor: _react.PropTypes.object,
	      onTypingDone: _react.PropTypes.func,
	      delayGenerator: _react.PropTypes.func
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      className: '',
	      avgTypingDelay: 70,
	      stdTypingDelay: 25,
	      startDelay: 0,
	      cursor: {},
	      onTypingDone: function onTypingDone() {},
	      delayGenerator: utils.gaussianRnd
	    },
	    enumerable: true
	  }]);

	  function Typist(props) {
	    var _this = this;

	    _classCallCheck(this, Typist);

	    _get(Object.getPrototypeOf(Typist.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      text: [],
	      isDone: false
	    };

	    this.onTypingDone = function () {
	      _this.setState({ isDone: true });
	      _this.props.onTypingDone();
	    };

	    this.delayGenerator = function (line, lineIdx, character, charIdx) {
	      var mean = _this.props.avgTypingDelay;
	      var std = _this.props.stdTypingDelay;
	      return _this.props.delayGenerator(mean, std, {
	        line: line,
	        lineIdx: lineIdx,
	        character: character,
	        charIdx: charIdx,
	        defDelayGenerator: function defDelayGenerator() {
	          var mn = arguments.length <= 0 || arguments[0] === undefined ? mean : arguments[0];
	          var st = arguments.length <= 1 || arguments[1] === undefined ? std : arguments[1];
	          return utils.gaussianRnd(mn, st);
	        }
	      });
	    };

	    if (this.props.children) {
	      this.toType = utils.extractText(this.props.children);

	      if (this.props.startDelay > 0) {
	        this.typeAll = setTimeout.bind(window, this.typeAll.bind(this), this.props.startDelay);
	      }
	    }
	  }

	  _createClass(Typist, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.children) {
	        this.typeAll();
	      } else {
	        this.onTypingDone();
	      }
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      for (var idx = 0; idx < nextState.text.length; idx++) {
	        var txt = this.state.text[idx];
	        var ntxt = nextState.text[idx];
	        if (txt !== ntxt && ntxt.length > 0) return true;
	      }
	      return this.state.isDone !== nextState.isDone;
	    }
	  }, {
	    key: 'typeAll',
	    value: function typeAll() {
	      var _this2 = this;

	      var strs = arguments.length <= 0 || arguments[0] === undefined ? this.toType : arguments[0];

	      utils.asyncEach(strs, function (line, adv, idx) {
	        _this2.setState({ text: _this2.state.text.concat(['']) }, function () {
	          _this2.typeStr(line, idx, adv);
	        });
	      }, this.onTypingDone);
	    }
	  }, {
	    key: 'typeStr',
	    value: function typeStr(line, idx) {
	      var _this3 = this;

	      var onDone = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

	      utils.eachRndTimeout(line, function (ch, adv) {
	        var text = _this3.state.text.slice();
	        text[idx] += ch;
	        _this3.setState({ text: text }, adv);
	      }, onDone, this.delayGenerator.bind(this, line, idx));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var className = this.props.className;
	      var innerTree = utils.extractTreeWithText(this.props.children, this.state.text);

	      return _react2['default'].createElement(
	        'div',
	        { className: 'Typist ' + className },
	        innerTree,
	        _react2['default'].createElement(_Cursor2['default'], _extends({ isDone: this.state.isDone }, this.props.cursor))
	      );
	    }
	  }]);

	  return Typist;
	})(_react.Component);

	exports['default'] = Typist;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(3);

	var Cursor = (function (_Component) {
	  _inherits(Cursor, _Component);

	  _createClass(Cursor, null, [{
	    key: 'propTypes',
	    value: {
	      blink: _react.PropTypes.bool,
	      show: _react.PropTypes.bool,
	      element: _react.PropTypes.node,
	      hideWhenDone: _react.PropTypes.bool,
	      hideWhenDoneDelay: _react.PropTypes.number,
	      isDone: _react.PropTypes.bool
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      blink: true,
	      show: true,
	      element: '|',
	      hideWhenDone: false,
	      hideWhenDoneDelay: 1000,
	      isDone: false
	    },
	    enumerable: true
	  }]);

	  function Cursor(props) {
	    _classCallCheck(this, Cursor);

	    _get(Object.getPrototypeOf(Cursor.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      shouldRender: this.props.show
	    };
	  }

	  _createClass(Cursor, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var _this = this;

	      var shouldHide = !this.props.isDone && nextProps.isDone && this.props.hideWhenDone;
	      if (shouldHide) {
	        setTimeout(function () {
	          return _this.setState({ shouldRender: false });
	        }, this.props.hideWhenDoneDelay);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.shouldRender) {
	        var className = this.props.blink ? ' Cursor--blinking' : '';
	        return _react2['default'].createElement(
	          'span',
	          { className: 'Cursor' + className },
	          this.props.element
	        );
	      }
	      return null;
	    }
	  }]);

	  return Cursor;
	})(_react.Component);

	exports['default'] = Cursor;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	exports.gaussianRnd = gaussianRnd;
	exports.asyncEach = asyncEach;
	exports.eachRndTimeout = eachRndTimeout;
	exports.exclude = exclude;
	exports.extractText = extractText;
	exports.elementFactoryMaker = elementFactoryMaker;
	exports.extractTreeWithText = extractTreeWithText;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function gaussianRnd(mean, std) {
	  var times = 12;
	  var sum = 0;
	  for (var idx = 0; idx < times; idx++) {
	    sum += Math.random();
	  }
	  sum -= times / 2;
	  return Math.round(sum * std) + mean;
	}

	function asyncEach(arr, callback) {
	  var onDone = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

	  var count = 0;
	  var adv = function adv() {
	    if (count === arr.length) {
	      return onDone();
	    }
	    var idx = count;
	    count++;
	    callback(arr[idx], adv, idx);
	  };
	  adv();
	}

	function eachRndTimeout(arr, callback, onDone, rndFn) {
	  asyncEach(arr, function (el, adv, idx) {
	    callback(el, function () {
	      setTimeout(adv, rndFn(el, idx));
	    });
	  }, onDone);
	}

	function exclude(obj, keys) {
	  var res = {};
	  for (var key in obj) {
	    if (keys.indexOf(key) === -1) {
	      res[key] = obj[key];
	    }
	  }
	  return res;
	}

	function extractText(toType) {
	  var st = toType ? [toType] : [];
	  var lines = [];

	  while (st.length > 0) {
	    var cur = st.pop();

	    if (_react2['default'].isValidElement(cur)) {
	      _react2['default'].Children.forEach(cur.props.children, function (child) {
	        st.push(child);
	      });
	    } else {
	      if (Array.isArray(cur)) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = cur[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var el = _step.value;

	            st.push(el);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator['return']) {
	              _iterator['return']();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      } else {
	        lines.unshift(cur);
	      }
	    }
	  }
	  return lines;
	}

	function elementFactoryMaker() {
	  var key = 0;
	  return function (el) {
	    var tag = el.type;
	    var props = exclude(el.props, ['children']);
	    props.key = 'Typist-el-' + key++;
	    return _react2['default'].createElement.bind(null, tag, props);
	  };
	}

	function extractTreeWithText() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (!args[0]) return void 0;
	  var factMaker = elementFactoryMaker();

	  var inner = function inner(tree, text, textIdx) {
	    if (textIdx >= text.length) return [null, textIdx];
	    var idx = textIdx;
	    var recurse = function recurse(ch) {
	      var _inner = inner(ch, text, idx);

	      var _inner2 = _slicedToArray(_inner, 2);

	      var child = _inner2[0];
	      var advIdx = _inner2[1];

	      idx = advIdx;
	      return child;
	    };

	    // Recursively call on children of React Element
	    if (_react2['default'].isValidElement(tree)) {
	      var fact = factMaker(tree);
	      var children = _react2['default'].Children.map(tree.props.children, recurse) || [];
	      return [fact.apply(undefined, _toConsumableArray(children)), idx];
	    }

	    // Recursively call on array
	    if (Array.isArray(tree)) {
	      var children = tree.map(recurse);
	      return [children, idx];
	    }

	    // Return text
	    return [text[idx], idx + 1];
	  };
	  return inner.apply(undefined, args.concat([0]))[0];
	}

/***/ }
/******/ ])
});
;