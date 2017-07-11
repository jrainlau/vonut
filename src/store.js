import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    allArticles: [],
    articles: [],
    tags: [],
    selectedTag: 'all'
  },

  mutations: {
    ALL_ARTICLES (_state, allArticles) {
      _state.allArticles = allArticles
    },
    GET_ARTICLES (_state, articles) {
      _state.articles = articles
    },
    GET_TAGS (_state, tags) {
      _state.tags = tags
    },
    SELECT_TAG (_state, selectedTag) {
      _state.selectedTag = selectedTag
    }
  },

  actions: {
    getArticles ({ commit }) {
      const articles = require('~articles/articles.json')
      const articlesArr = Object.keys(articles).map((name) => {
        return {
          name: name,
          title: articles[name].title,
          tags: articles[name].tags,
          date: articles[name].date,
          cover: articles[name].cover,
          desc: articles[name].desc
        }
      })
      commit('ALL_ARTICLES', articlesArr)
      commit('GET_ARTICLES', articlesArr)

      const tagsSet = new Set()
      articlesArr.forEach(({ tags }) => {
        tags.forEach((tag) => {
          tagsSet.add(tag)
        })
      })
      commit('GET_TAGS', [...tagsSet])
    },
    selectTag ({ state, commit }, tag) {
      if (tag) {
        const tagedArticles = state.allArticles.filter(({ tags }) => {
          return tags.includes(tag)
        })
        commit('GET_ARTICLES', tagedArticles)
        commit('SELECT_TAG', tag)
      } else {
        commit('GET_ARTICLES', state.allArticles)
        commit('SELECT_TAG', 'all')
      }
    }
  },

  getters: {
    articles (_state) {
      return _state.articles
    },
    tags (_state) {
      return _state.tags
    },
    selectedTag (_state) {
      return _state.selectedTag
    }
  }
})

export default store
