'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parseConfig = require('./parseConfig');

Object.keys(_parseConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _parseConfig[key];
    }
  });
});