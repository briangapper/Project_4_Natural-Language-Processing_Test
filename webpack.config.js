const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist/dev'),
        libraryTarget: 'var',
        library: 'Client'
    },
    devServer:{
        port: 8000
    },
    // stats: 'verbose',
    module: {
       rules: [
           {
               test: /\.js$/,
               exclude: '/node_modules/',
               loader: 'babel-loader'
           },
           {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
       ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        })
    ]
}