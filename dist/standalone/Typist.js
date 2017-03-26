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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Cursor = __webpack_require__(2);

	var _Cursor2 = _interopRequireDefault(_Cursor);

	var _utils = __webpack_require__(4);

	var utils = _interopRequireWildcard(_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Typist = function (_Component) {
	  _inherits(Typist, _Component);

	  function Typist(props) {
	    _classCallCheck(this, Typist);

	    var _this = _possibleConstructorReturn(this, (Typist.__proto__ || Object.getPrototypeOf(Typist)).call(this, props));

	    _this.state = {
	      text: [],
	      isDone: false
	    };

	    _this.onTypingDone = function () {
	      if (!_this.mounted) {
	        return;
	      }
	      _this.setState({ isDone: true });
	      _this.props.onTypingDone();
	    };

	    _this.delayGenerator = function (line, lineIdx, character, charIdx) {
	      var mean = _this.props.avgTypingDelay;
	      var std = _this.props.stdTypingDelay;
	      return _this.props.delayGenerator(mean, std, {
	        line: line,
	        lineIdx: lineIdx,
	        character: character,
	        charIdx: charIdx,
	        defDelayGenerator: function defDelayGenerator() {
	          var mn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mean;
	          var st = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : std;
	          return utils.gaussianRnd(mn, st);
	        }
	      });
	    };

	    _this.typeLine = function (line, lineIdx) {
	      if (!_this.mounted) {
	        return Promise.resolve();
	      }
	      var onLineTyped = _this.props.onLineTyped;


	      return new Promise(function (resolve, reject) {
	        _this.setState({ text: _this.state.text.concat(['']) }, function () {
	          utils.eachPromise(line, _this.typeCharacter, line, lineIdx).then(function () {
	            return onLineTyped(line, lineIdx);
	          }).then(resolve).catch(reject);
	        });
	      });
	    };

	    _this.typeCharacter = function (character, charIdx, line, lineIdx) {
	      if (!_this.mounted) {
	        return Promise.resolve();
	      }
	      var onCharacterTyped = _this.props.onCharacterTyped;


	      return new Promise(function (resolve) {
	        var text = _this.state.text.slice();
	        text[lineIdx] += character;
	        _this.setState({ text: text }, function () {
	          onCharacterTyped(character, charIdx);
	          var delay = _this.delayGenerator(line, lineIdx, character, charIdx);
	          setTimeout(resolve, delay);
	        });
	      });
	    };

	    _this.mounted = false;
	    _this.linesToType = [];

	    if (props.children) {
	      _this.linesToType = utils.extractText(props.children);
	    }
	    return _this;
	  }

	  _createClass(Typist, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.mounted = true;
	      var _props = this.props;
	      var children = _props.children;
	      var startDelay = _props.startDelay;

	      if (children) {
	        if (startDelay > 0 && typeof window !== 'undefined') {
	          setTimeout(this.typeAllLines.bind(this), startDelay);
	        } else {
	          this.typeAllLines();
	        }
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
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.mounted = false;
	    }
	  }, {
	    key: 'typeAllLines',
	    value: function typeAllLines() {
	      var _this2 = this;

	      var lines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.linesToType;

	      return utils.eachPromise(lines, this.typeLine).then(function () {
	        return _this2.onTypingDone();
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props;
	      var className = _props2.className;
	      var cursor = _props2.cursor;
	      var isDone = this.state.isDone;

	      var innerTree = utils.extractTreeWithText(this.props.children, this.state.text);

	      return _react2.default.createElement(
	        'div',
	        { className: 'Typist ' + className },
	        innerTree,
	        _react2.default.createElement(_Cursor2.default, _extends({ isDone: isDone }, cursor))
	      );
	    }
	  }]);

	  return Typist;
	}(_react.Component);

	Typist.propTypes = {
	  children: _react.PropTypes.node,
	  className: _react.PropTypes.string,
	  avgTypingDelay: _react.PropTypes.number,
	  stdTypingDelay: _react.PropTypes.number,
	  startDelay: _react.PropTypes.number,
	  cursor: _react.PropTypes.object,
	  onCharacterTyped: _react.PropTypes.func,
	  onLineTyped: _react.PropTypes.func,
	  onTypingDone: _react.PropTypes.func,
	  delayGenerator: _react.PropTypes.func
	};
	Typist.defaultProps = {
	  className: '',
	  avgTypingDelay: 70,
	  stdTypingDelay: 25,
	  startDelay: 0,
	  cursor: {},
	  onCharacterTyped: function onCharacterTyped() {},
	  onLineTyped: function onLineTyped() {},
	  onTypingDone: function onTypingDone() {},
	  delayGenerator: utils.gaussianRnd
	};
	exports.default = Typist;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Cursor = function (_Component) {
	  _inherits(Cursor, _Component);

	  function Cursor(props) {
	    _classCallCheck(this, Cursor);

	    var _this = _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this, props));

	    _this._isReRenderingCursor = false;
	    _this.state = {
	      shouldRender: _this.props.show
	    };
	    return _this;
	  }

	  _createClass(Cursor, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var _this2 = this;

	      var shouldHide = !this.props.isDone && nextProps.isDone && this.props.hideWhenDone;
	      if (shouldHide) {
	        setTimeout(function () {
	          return _this2.setState({ shouldRender: false });
	        }, this.props.hideWhenDoneDelay);
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      var _props = this.props;
	      var show = _props.show;
	      var isDone = _props.isDone;

	      if (!show) {
	        return;
	      }
	      if (isDone) {
	        return;
	      }
	      if (this._isReRenderingCursor) {
	        return;
	      }

	      // In webkit and blink, rendering the cursor alongside the text as it
	      // animates sometimes causes the text to stop rendering when it reaches
	      // a new line break, even though the underlying DOM /does/ contain
	      // the text. This seems to happen when the space available for the text is
	      // at a specific width that makes it so the line break happens within a
	      // word.
	      // Using dev tools, when in this state, if you modify the dom or any style,
	      // it immediately renders all of the text in its correct position.
	      // Given that observation, this is a hackish solutions that re-renders the
	      // cursor every time a character is rendered, just to ensure that the text
	      // is rendered correctly.
	      // See #13 and #15 for more details
	      this._reRenderCursor();
	    }
	  }, {
	    key: '_reRenderCursor',
	    value: function _reRenderCursor() {
	      var _this3 = this;

	      this._isReRenderingCursor = true;
	      this.setState({ shouldRender: false }, function () {
	        _this3.setState({ shouldRender: true }, function () {
	          _this3._isReRenderingCursor = false;
	        });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.shouldRender) {
	        var className = this.props.blink ? ' Cursor--blinking' : '';
	        return _react2.default.createElement(
	          'span',
	          { className: 'Cursor' + className },
	          this.props.element
	        );
	      }
	      return null;
	    }
	  }]);

	  return Cursor;
	}(_react.Component);

	Cursor.propTypes = {
	  blink: _react.PropTypes.bool,
	  show: _react.PropTypes.bool,
	  element: _react.PropTypes.node,
	  hideWhenDone: _react.PropTypes.bool,
	  hideWhenDoneDelay: _react.PropTypes.number,
	  isDone: _react.PropTypes.bool
	};
	Cursor.defaultProps = {
	  blink: true,
	  show: true,
	  element: '|',
	  hideWhenDone: false,
	  hideWhenDoneDelay: 1000,
	  isDone: false
	};
	exports.default = Cursor;

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sleep = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.gaussianRnd = gaussianRnd;
	exports.eachPromise = eachPromise;
	exports.exclude = exclude;
	exports.extractText = extractText;
	exports.elementFactoryMaker = elementFactoryMaker;
	exports.extractTreeWithText = extractTreeWithText;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var sleep = exports.sleep = function sleep(val) {
	  return new Promise(function (resolve) {
	    return setTimeout(resolve, val);
	  });
	};

	function gaussianRnd(mean, std) {
	  var times = 12;
	  var sum = 0;
	  for (var idx = 0; idx < times; idx++) {
	    sum += Math.random();
	  }
	  sum -= times / 2;
	  return Math.round(sum * std) + mean;
	}

	function eachPromise(arr, iterator) {
	  for (var _len = arguments.length, extraArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    extraArgs[_key - 2] = arguments[_key];
	  }

	  var promiseReducer = function promiseReducer(prev, current, idx) {
	    return prev.then(function () {
	      return iterator.apply(undefined, [current, idx].concat(extraArgs));
	    });
	  };
	  return Array.from(arr).reduce(promiseReducer, Promise.resolve());
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

	    if (_react2.default.isValidElement(cur)) {
	      _react2.default.Children.forEach(cur.props.children, function (child) {
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
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
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
	    return _react2.default.createElement.bind(null, tag, props);
	  };
	}

	function extractTreeWithText() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
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
	    if (_react2.default.isValidElement(tree)) {
	      var fact = factMaker(tree);
	      var children = _react2.default.Children.map(tree.props.children, recurse) || [];
	      return [fact.apply(undefined, _toConsumableArray(children)), idx];
	    }

	    // Recursively call on array
	    if (Array.isArray(tree)) {
	      var _children = tree.map(recurse);
	      return [_children, idx];
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