const { join } = require('path')
const hljs = require('highlight.js')
const OfflinePlugin = require('offline-plugin')
const markdown = require('markdown-it')({
  highlight (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + markdown.utils.escapeHtml(str) + '</code></pre>';
  }
})

const resolve = dir => join(__dirname, '..', dir)

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:8].[ext]'
          }
        }, {
          loader: 'img-loader'
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: markdown
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.less'],
    modules: [resolve('src'), 'node_modules'],
    alias: {
      '~src': resolve('src'),
      '~components': resolve('src/components'),
      '~pages': resolve('src/pages'),
      '~assets': resolve('src/assets'),
      '~store': resolve('src/store'),
      '~articles': resolve('articles')
    }
  },
  plugins: [
    new OfflinePlugin()
  ]
}
