const path = require('path')

module.exports = {
    lintOnSave: false,
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    devServer: {
        sockHost: 'http://localhost:8080/',
        disableHostCheck: true,
    },
    chainWebpack: config => {
        config.module
            .rule('js')
            .include.add(path.resolve(__dirname, 'packages')).end()
            .use('babel')
            .loader('babel-loader')

            .tap(options => {
                return options
            })
    }
}