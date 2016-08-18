/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = [
  {
    devtool: 'inline-source-map',
    entry: './client.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/__build__/'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: { plugins: [] }
      }]
    }
  },
  {
    entry: {
      app: './stylesheets/style.css'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'style.css',
      publicPath: '/__build__/'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  }

];


// This will make the redux-simpler-router module resolve to the
// latest src instead of using it from npm. Remove this if running
// outside of the source.
// var src = path.join(__dirname, '../../src')
// var fs = require('fs')
// if (fs.existsSync(src)) {
//   // Use the latest src
//   module.exports.resolve = { alias: { 'react-router-redux': src } }
//   module.exports.module.loaders.push({
//     test: /\.js$/,
//     loaders: ['babel'],
//     include: src
//   });
// }
