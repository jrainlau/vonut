import Vue from 'vue'
import VueRouter from 'vue-router'
import articlesInfo from '~articles/articles.json'

const routes = [
  { path: '/', component: () => import('~pages/list') },
  { path: '*', component: () => import('~pages/404') }
]

Object.keys(articlesInfo).forEach((key) => {
  routes.splice(1, 0, {
    path: `/${key.replace(/\.md/, '')}`,
    component: () => import(`~articles/${key}`)
  })
})

Vue.use(VueRouter)

const router = new VueRouter({ routes })

export default router
