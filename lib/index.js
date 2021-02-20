/**
 * 入口文件
 */

const Compiler = require('./compiler');
const options = require('../tinypack.config');

new Compiler(options).run();