const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./webpack.config');

config.entry = './src/Typist.jsx';
config.output = {
  path: path.join(__dirname, './dist'),
  filename: 'Typist.js',
  library: 'Typist',
  libraryTarget: 'commonjs2',
};
config.externals = {
  react: 'react',
};
config.target = 'node';
config.plugins = [
  new ExtractTextPlugin('Typist.css', {allChunks: true}),
];

module.exports = config;
