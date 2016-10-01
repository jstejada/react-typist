const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const sassLoaders = [
  'css?sourceMap',
  'sass?sourceMap&includePaths[]=' +
    encodeURIComponent(path.resolve(__dirname, './src')),
  'postcss',
];

module.exports = {
  entry: './examples/index.js',
  output: {
    path: path.join(__dirname, './examples/dist'),
    filename: 'index.js',
    publicPath: '/dist/',
  },
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style', sassLoaders.join('!')),
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'babel?' +
            'cacheDirectory&' +
            'presets[]=react,presets[]=es2015,presets[]=stage-0',
          'eslint',
        ],
      },
    ],
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
  plugins: [
    new ExtractTextPlugin('main.css', {allChunks: true}),
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['src', 'node_modules'],
  },
};
