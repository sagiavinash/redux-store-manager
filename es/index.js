'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _redux = require('redux');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reduceReducers = function reduceReducers(reducers) {
  return function (state, action) {
    return reducers.reduce(function (result, reducer) {
      return reducer(result, action);
    }, state);
  };
};

var storeManager = {
  store: null,
  reducerMap: {},
  registerReducer: function registerReducer(reducerMap) {
    var _this = this;

    Object.entries(reducerMap).foreach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          name = _ref2[0],
          reducer = _ref2[1];

      if (!_this.reducerMap[name]) _this.reducerMap[name] = [];

      _this.reducerMap[name].push(reducer);
    });
  },
  createRootReducer: function createRootReducer() {
    var _this2 = this;

    return (0, _redux.combineReducers)(Object.keys(this.reducerMap).reduce(function (result, key) {
      return Object.assign(result, _defineProperty({}, key, reduceReducers(_this2.reducerMap[key])));
    }, {}));
  },
  createStore: function createStore() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.store = _redux.createStore.apply(undefined, [this.createRootReducer()].concat(args));

    return this.store;
  },
  refreshStore: function refreshStore() {
    this.store.replaceReducer(this.createRootReducer());
  }
};

exports.default = storeManager;
