export default [
  { path: '/', component: resolve => require(['~pages/list'], resolve) },
  { path: '/vue-occupy', component: resolve => require(['~articles/vue-occupy.md'], resolve) },
  { path: '/sphinx', component: resolve => require(['~articles/sphinx.md'], resolve) },
  { path: '/scion', component: resolve => require(['~articles/scion.md'], resolve) },
  { path: '/motto', component: resolve => require(['~articles/motto.md'], resolve) },
  { path: '/markcook', component: resolve => require(['~articles/markcook.md'], resolve) },
  { path: '*', component: resolve => require(['~pages/404'], resolve) }
]
