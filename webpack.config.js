/**
 * Created by Ben.Vaughan on 9/9/2016.
 */
var path = require('path');

module.exports = {
    entry: ['webpack/hot/dev-server', "./src/js/entry.js"],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    module: {
        loaders: [

            // sass files
            { test: /\.css$/, loaders: ['style', 'css'] },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
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
                test: /bootstrap-sass\/assets\/javascripts\//,
                loader: 'imports?jQuery=jquery'
            }
        ]
    }
};
