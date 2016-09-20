/**
 * Created by Ben.Vaughan on 9/9/2016.
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: ['webpack/hot/dev-server','bootstrap-loader', "./src/js/entry.js"],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    module: {
        loaders: [

            // {
            //     test: /\.css$/,
            //     loaders: ['style', 'css', 'postcss']
            // },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
                // loader: ExtractTextPlugin.extract('style', 'css-loader', 'postcss-loader', 'sass-loader')
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file'
            },

            // Bootstrap 3
            {
                test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
                loader: 'imports?jQuery=jquery'
            }

        ]
    },
    postcss: function(){
        return [autoprefixer, precss];
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ]
};
