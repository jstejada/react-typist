module.exports =
/******/ (function(modules) { // webpackBootstrap
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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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
	      startDelay: 0,
	      cursor: {},
	      onTypingDone: function onTypingDone() {},
	      delayGenerator: utils.gaussianRnd
	    },
	    enumerable: true
	  }]);

	  function Typist(props) {
	    _classCallCheck(this, Typist);

	    _get(Object.getPrototypeOf(Typist.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      text: []
	    };
	    if (this.props.children) {
	      this.toType = utils.extractText(this.props.children);
	      this.elFactories = utils.extractElementFactories(this.props.children);

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
	        this.props.onTypingDone();
	      }
	    }
	  }, {
	    key: 'typeAll',
	    value: function typeAll() {
	      var _this = this;

	      var strs = arguments.length <= 0 || arguments[0] === undefined ? this.toType : arguments[0];

	      utils.asyncEach(strs, function (line, adv, idx) {
	        _this.setState({ text: _this.state.text.concat(['']) }, function () {
	          _this.typeStr(line, idx, adv);
	        });
	      }, this.props.onTypingDone);
	    }
	  }, {
	    key: 'typeStr',
	    value: function typeStr(line, idx) {
	      var _this2 = this;

	      var onDone = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

	      utils.eachRndTimeout(line, function (ch, adv) {
	        var text = _this2.state.text.slice();
	        text[idx] += ch;
	        _this2.setState({ text: text }, adv);
	      }, onDone, this.props.delayGenerator.bind(null, this.props.avgTypingDelay));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var className = this.props.className;
	      var els = this.state.text.map(function (line, idx) {
	        return _this3.elFactories[idx](line);
	      });

	      return _react2['default'].createElement(
	        'div',
	        { className: 'Typist ' + className },
	        els,
	        _react2['default'].createElement(_Cursor2['default'], this.props.cursor)
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

	module.exports = require("react");

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
	      element: _react.PropTypes.node
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      blink: true,
	      show: true,
	      element: '|'
	    },
	    enumerable: true
	  }]);

	  function Cursor(props) {
	    _classCallCheck(this, Cursor);

	    _get(Object.getPrototypeOf(Cursor.prototype), 'constructor', this).call(this, props);
	  }

	  _createClass(Cursor, [{
	    key: 'render',
	    value: function render() {
	      var el = null;
	      if (this.props.show) {
	        var blink = this.props.blink ? '--blinking' : '';
	        el = _react2['default'].createElement(
	          'span',
	          { className: 'Cursor' + blink },
	          this.props.element
	        );
	      }
	      return el;
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
	exports.gaussianRnd = gaussianRnd;
	exports.asyncEach = asyncEach;
	exports.eachRndTimeout = eachRndTimeout;
	exports.exclude = exclude;
	exports.validateTypeable = validateTypeable;
	exports.extractText = extractText;
	exports.extractElementFactories = extractElementFactories;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var Console = console;

	function gaussianRnd() {
	  var mean = arguments.length <= 0 || arguments[0] === undefined ? 70 : arguments[0];

	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var _ref$tms = _ref.tms;
	  var tms = _ref$tms === undefined ? 12 : _ref$tms;
	  var _ref$std = _ref.std;
	  var std = _ref$std === undefined ? 25 : _ref$std;

	  var sum = 0;
	  for (var idx = 0; idx < tms; idx++) {
	    sum += Math.random();
	  }
	  sum -= tms / 2;
	  return Math.round(sum * std) + mean;
	}

	function asyncEach(arr, iterator) {
	  var onDone = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

	  var count = 0;
	  var adv = function adv() {
	    if (count === arr.length) {
	      return onDone();
	    }
	    var idx = count;
	    count++;
	    iterator(arr[idx], adv, idx);
	  };
	  adv();
	}

	function eachRndTimeout(arr, iterator, onDone) {
	  var rndFn = arguments.length <= 3 || arguments[3] === undefined ? gaussianRnd : arguments[3];

	  asyncEach(arr, function (el, adv) {
	    setTimeout(function () {
	      iterator(el, adv);
	    }, rndFn());
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

	function validateTypeable(obj) {
	  if (typeof obj !== 'string' && typeof obj !== 'number') {
	    Console.warn('The arguments passed as children to Typist must be ' + 'strings or numbers or ReactElements containing a single child of those types');
	  }
	  return obj.toString();
	}

	function extractText(toType) {
	  var els = Array.isArray(toType) ? toType : [toType];

	  return els.map(function (el) {
	    var val = '';
	    if (_react2['default'].isValidElement(el)) {
	      val = el.props.children ? validateTypeable(el.props.children) : '';
	    } else {
	      val = validateTypeable(el);
	    }
	    return val;
	  });
	}

	function extractElementFactories(toType) {
	  var els = Array.isArray(toType) ? toType : [toType];

	  return els.map(function (el, idx) {
	    var tag = _react2['default'].isValidElement(el) ? el.type : 'span';
	    var props = _react2['default'].isValidElement(el) ? exclude(el.props, ['children']) : {};
	    props.key = ['Typist-line-' + idx];
	    return _react2['default'].createElement.bind(null, tag, props);
	  });
	}

/***/ }
/******/ ]);