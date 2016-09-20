/**
 * Created by Ben.Vaughan on 9/9/2016.
 */
require('file?name=[name].[ext]!../index.html');
require("../sass/style.scss");
require('bootstrap-loader');

document.write(require("./content.js"));