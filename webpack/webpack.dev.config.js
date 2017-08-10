const { join } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const basicConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ip = require('ip')

const resolve = dir => join(__dirname, '..', dir)

module.exports = merge(basicConfig, {
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: 'js/[name].js',
    path: resolve('dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: resolve('/'),
    compress: true,
    hot: true,
    inline: true,
    publicPath: '/',
    stats: 'minimal',
    host: 'localhost'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['app']
    })
  ]
})
