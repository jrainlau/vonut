import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'highlight.js/styles/atom-one-light.css'
var OfflinePlugin = require('offline-plugin/runtime')

OfflinePlugin.install({
  onUpdateReady () {
    OfflinePlugin.applyUpdate()
  },
  onUpdated () {
    console.log('updated')
    window.location.reload()
  }
})

/* eslint no-new: "off" */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
