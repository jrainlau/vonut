import Vue from 'vue'
import VueRouter from 'vue-router'
import articles from '~articles/articles.json'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: resolve => require(['~pages/list'], resolve) },
  { path: '*', component: resolve => require(['~pages/404'], resolve) }
]

Object.keys(articles).forEach((article) => {
  routes.splice(1, 0, {
    path: `/${article.replace(/\.md/, '')}`,
    component: resolve => require([`~articles/${article}`], resolve)
  })
})

const router = new VueRouter({ routes })

export default router
