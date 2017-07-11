console.log('Watching dirs...');
const { resolve } = require('path')
const chokidar = require('chokidar')
const { readFileSync, writeFileSync } = require('fs')

const articleInfoObj = {}

function getArticleInfo (path) {
  const fileName = path.split('/').pop()
  let content
  if (/\.md/.test(fileName)) {
    content = readFileSync(resolve(__dirname, `../articles/${fileName}`)).toString().replace(/[\n\r]/g, '')
  }
  try {
    const info = content.match(/\{(.*?)\}/)[1]
    articleInfoObj[fileName] = JSON.parse(`{${info}}`)
    writeFileSync(resolve(__dirname, '../articles/articles.json'), JSON.stringify(articleInfoObj, null, 2))
    console.log('articles.json has been updated.')
  } catch (__) {}
}

const watcher = chokidar.watch(resolve(__dirname, '../articles'))

watcher
  .on('add', (path) => {
    getArticleInfo(path)
  })
  .on('change', (path) => {
    getArticleInfo(path)
  })

module.exports = watcher
