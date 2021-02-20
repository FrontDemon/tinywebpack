const { getAST, getDependencies, transform } =  require('./parser');
const path = require('path');
const ast = getAST(path.join(__dirname, '../src/index.js'));
const dependencies = getDependencies(ast);

const target = transform(ast);
console.log(target);