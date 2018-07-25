// vendor modules
var webpack = require('webpack');
var path = require('path');


var config = {
  entry: path.resolve(__dirname, './lib/'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'redux-store-manager.js',
    library: 'redux-store-manager',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
      },
    }],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
  ],
};

module.exports = config;
