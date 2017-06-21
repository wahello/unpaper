const WebpackOnBuildPlugin = require('on-build-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { spawn } = require('child_process');
const electron = require('electron');
const once = require('lodash/once');
const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';
const runElectron = once(() => spawn(electron, ['.'], { stdio: 'inherit' }).on('close', process.exit));

module.exports = {
  entry: {
    main: './src/main.js',
    view: './src/view/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  watch: isDevelopment,
  devtool: isDevelopment && 'eval-source-map',
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify(NODE_ENV),
        }
    }),
    new WebpackOnBuildPlugin(() => isDevelopment && runElectron()),
    new HtmlWebpackPlugin({
      template: './src/view/index.html',
      excludeChunks: ['main'],
    }),
  ],
  node: {
    __filename: false,
    __dirname: false,
  },
  target: 'electron-main',
};
