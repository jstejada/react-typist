const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const sassLoaders = [
  'css?sourceMap',
  'autoprefixer?browsers=last 2 version',
  'sass?sourceMap&includePaths[]=' +
    encodeURIComponent(path.resolve(__dirname, './src')),
];

module.exports = {
  entry: [
    'babel-polyfill',
    './examples/index.js',
  ],
  output: {
    path: path.join(__dirname, './examples/dist'),
    filename: 'index.js',
    publicPath: '/dist/',
  },
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract("style", sassLoaders.join('!'))
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel', 'eslint'],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('main.css', {allChunks: true}),
    new CopyWebpackPlugin([{
      from: './examples/ie8polyfill.js',
      to: 'ie8polyfill.js',
    }]),
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['src', 'node_modules'],
  },
};
