console.log('Watching dirs...')
const { resolve } = require('path')
const chokidar = require('chokidar')
const { readFileSync, writeFileSync } = require('fs')

const articleInfoObj = {}
const routes = [
  "{ path: '/', component: resolve => require(['~pages/list'], resolve) }",
  "{ path: '*', component: resolve => require(['~pages/404'], resolve) }"
]

function getArticleInfo (path) {
  const fileName = path.split('/').pop()
  let content
  if (/\.md/.test(fileName)) {
    content = readFileSync(resolve(__dirname, `../articles/${fileName}`)).toString().replace(/[\n\r]/g, '')
    try {
      const info = content.match(/\{(.*?)\}/)[1]
      articleInfoObj[fileName] = JSON.parse(`{${info}}`)
      writeFileSync(resolve(__dirname, '../articles/articles.json'), JSON.stringify(articleInfoObj, null, 2))
      console.log('articles.json has been updated.')
    } catch (__) {}
  }
}

function generateRoutes (path, routes) {
  const fileName = path.split('/').pop()
  if (/\.md/.test(fileName)) {
    const fileContent = `{ path: '/${fileName.replace(/\.md/, '')}', component: resolve => require(['~articles/${fileName}'], resolve) }`
    routes.splice(1, 0, fileContent)
    writeFileSync(resolve(__dirname, '../src/routes.js'), `export default ${JSON.stringify(routes, null, 2).replace(/\"/g, '')}\n`)
  }
}

function deleteRoutes (path, routes) {
  const fileName = path.split('/').pop()
  if (/\.md/.test(fileName)) {
    const fileContent = `{ path: '/${fileName.replace(/\.md/, '')}', component: resolve => require(['~articles/${fileName}'], resolve) }`
    const index = routes.indexOf(fileContent)
    routes.splice(index, 1)
    writeFileSync(resolve(__dirname, '../src/routes.js'), `export default ${JSON.stringify(routes, null, 2).replace(/\"/g, '')}\n`)
  }
}

const watcher = chokidar.watch(resolve(__dirname, '../articles'))

watcher
  .on('add', (path) => {
    console.log('add:' + path)
    getArticleInfo(path)
    generateRoutes(path, routes)
  })
  .on('change', (path) => {
    console.log('change: ' + path)
    getArticleInfo(path)
  })
  .on('unlink', (path) => {
    console.log('delete: ' + path)
    deleteRoutes(path, routes)
  })

module.exports = watcher
