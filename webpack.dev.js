const path = require('path')
const webpack = require('webpack')
// Simplifies process of creating HTML files to serve webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Ensures that only the used files will be generated in the output directory
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist/dev'),
        // sets the output target type
        libraryTarget: 'var',
        // exports the built module as a variable to be used in the browser environment to ensure communication between files
        library: 'Client'
    },
    devServer: {
        port: 9000
    },
    // stats: 'verbose',
    module: {
         rules: [
            {
                // transforms modern JavaScript code into ECMAScript 5 (ES5) code, which can be run in older browsers
                 test: /\.js$/,
                 exclude: '/node_modules/',
                 loader: 'babel-loader'
            },
            {
                // transforms SASS files into nomral CSS files
                test: /.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
         ]
     },
     plugins: [
          new HtmlWebpackPlugin({
              template: './src/client/views/index.html',
              filename: './index.html'
          }),
          new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
          })
    ]
}