import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    allArticles: [],
    shownArticles: [],
    tags: [],
    selectedTag: 'all'
  },

  mutations: {
    GET_ALL_ARTICLES (_state, allArticles) {
      _state.allArticles = allArticles
    },
    SHOW_ARTICLES (_state, shownArticles) {
      _state.shownArticles = shownArticles
    },
    GET_TAGS (_state, tags) {
      _state.tags = tags
    },
    SELECT_TAG (_state, selectedTag) {
      _state.selectedTag = selectedTag
    }
  },

  actions: {
    /**
     * Get all the articles' information from articles.json
     * Generate tags list
     */
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
      commit('GET_ALL_ARTICLES', articlesArr)
      commit('SHOW_ARTICLES', articlesArr)

      const tagsSet = new Set()
      articlesArr.forEach(({ tags }) => {
        tags.forEach((tag) => {
          tagsSet.add(tag)
        })
      })
      commit('GET_TAGS', [...tagsSet])
    },
    /**
     * Select a tag and filt the article list that matches the tag
     * @param { String } tag tag name
     */
    selectTag ({ state, commit }, tag) {
      if (tag) {
        const tagArticles = state.allArticles.filter(({ tags }) => {
          return tags.includes(tag)
        })
        commit('SHOW_ARTICLES', tagArticles)
        commit('SELECT_TAG', tag)
      } else {
        commit('SHOW_ARTICLES', state.allArticles)
        commit('SELECT_TAG', 'all')
      }
    }
  },

  getters: {
    shownArticles (_state) {
      return _state.shownArticles
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
