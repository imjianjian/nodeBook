'use strict'
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    main: './src/main/index.js'
  },
  output: {
    path:  path.resolve(__dirname, '../dist') ,
    libraryTarget: 'commonjs2',
    filename: 'index.js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.node', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ],
  },
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    })
  ],
  target:'electron-main'
}
