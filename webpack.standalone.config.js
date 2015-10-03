const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./webpack.dist.config');

// Complete
const conf1 = Object.assign({}, config);
conf1.output = Object.assign({}, conf1.output, {
  path: path.join(__dirname, './dist/standalone'),
  libraryTarget: 'umd',
});
conf1.externals = {
  react: 'react',
};
conf1.target = 'web';

// Minified
const conf2 = Object.assign({}, conf1);
conf2.output = Object.assign({}, conf2.output, {
  filename: 'Typist.min.js',
});
conf2.plugins = [
  new ExtractTextPlugin('Typist.min.css', {allChunks: true}),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false,
    },
    compress: {
      warnings: false,
    },
  }),
];

module.exports = [conf1, conf2];
