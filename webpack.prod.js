const path = require('path');
const webpack = require('webpack');
// Simplifies process of creating HTML files to serve webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Ensures that only the used files will be generated in the output directory
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// Extracts CSS into separate files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Minifies JS files
const TerserPlugin = require('terser-webpack-plugin');
//Minifies CSS files
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// Generate service worker for web application
// const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist/prod'),
        // sets the output target type
        libraryTarget: 'var',
        // exports the built module as a variable to be used in the browser environment to ensure communication between files
        library: 'Client'
    },
    // Minifies CSS files
    optimization: {
        minimizer: [new TerserPlugin({}), new CSSMinimizerWebpackPlugin({})]
    },
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
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        // new WorkboxPlugin.GenerateSW({}),
        new CleanWebpackPlugin()
    ]
};