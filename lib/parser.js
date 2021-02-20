/**
 * 1 将代码解析成AST语法树，AST语法树转化成es5代码
 * 2 依赖的解析
 */
const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');

module.exports = {
    /**
     * 通过babylon生成AST（抽象语法树）
     */
    getAST: (path) => {
        const source = fs.readFileSync(path, 'utf-8');

        return babylon.parse(source, {
            sourceType: 'module'
        })
    },
    /**
     * 通过babel-traverse的importDeclaration方法获取依赖属性
     */
    getDependencies: (ast) => {
        const dependencies = [];
        traverse(ast, {
            // 获取import的依赖关系
            ImportDeclaration: ({ node }) => {
                dependencies.push(node.source.value);
            }
        })
        return dependencies;
    },
    /**
     * 通过babel-core将AST转化为ES5的代码
     */
    transform: (ast) => {
        const { code } = transformFromAst(ast, null, {
            presets: ['env'], // es2015, es2016, es2017相关语法都可以解析
        });
        return code;
    }  
   
}