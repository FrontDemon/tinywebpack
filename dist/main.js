(function(modules) {
            function require(filename) {
                var fn = modules[filename];
                var module = { exports: {}};
                fn(require, module, module.exports)
                
                return module.exports
            }
            require('D:\webpack-test\tinypack\src\index.js')
        })({'D:\webpack-test\tinypack\src\index.js': function(require, module, exports) {"use strict";

var _test = require("./test.js");

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.write(_test2.default);
console.log(_test2.default);},'./test.js': function(require, module, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var a = 'faisco hd';

exports.default = a;},})