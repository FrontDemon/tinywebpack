/**
 * 模块的构建以及文件的输出
 */
const { getAST, getDependencies, transform } =  require('./parser');
const path = require('path');
const fs = require('fs');

module.exports = class Compiler {
    constructor (options) {
        const { entry, output } = options;
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }
        
    /**
     *  入口方法
     */
    run () {
        const entryModule = this.buildModule(this.entry, true);
     
        this.modules.push(entryModule);
        
        this.modules.map((_module) => {
            _module.dependencies.map((dependencies) => {
                this.modules.push(this.buildModule(dependencies))
            })
        })

        this.emitFiles()
    }

    /**
     * 模块构建
     */
    buildModule (filename, isEntry) {
        let ast;

        // 如果是入口文件
        if (isEntry) {
            ast = getAST(filename)
        } else {
            // process.cwd() 即获取根目录
            const absolutePath = path.join(process.cwd(), './src', filename);
            ast = getAST(absolutePath)
        }

        return {
            filename,
            dependencies: getDependencies(ast),
            source: transform(ast),
        };
    }

    /**
     * 输出文件
     */
    emitFiles () {
        const outputPath = path.join(this.output.path, this.output.filename);

        let modules = '';

        this.modules.map((_module) => {
            modules += `'${_module.filename}': function(require, module, exports) {${_module.source}},`;
        })
        const bundle = `(function(modules) {
            function require(filename) {
                var fn = modules[filename];
                var module = { exports: {}};
                fn(require, module, module.exports)
                
                return module.exports
            }
            require('${this.entry}')
        })({${modules}})`;

        fs.writeFileSync(outputPath, bundle, 'utf-8');
    }
}