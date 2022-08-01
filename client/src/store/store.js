import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import CodebaseService from '@/services/Codebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  // plugins: [createPersistedState()],
  state: {
    token: localStorage.getItem('lxcb-token'),
    tokenExpiry: localStorage.getItem('lxcb-expires'),
    user: null,
    isUserLoggedIn: !!localStorage.getItem('lxcb-token'),
    entries: [],
    categories: []
  },
  getters: {
    getEntries: state => {
      return state.entries
    },
    getCategories: state => {
      return state.categories
    },
    getCategory: state => (id) => {
      return state.categories.find(cat => cat.id === id)
    },
    getListing: state => (id) => {
      return state.entries.find(e => e.id === id)
    },
    getListings: state => {
      return state.entries
    },
    getCategoryListings: state => (id) => {
      return state.entries.filter((e) => {
        return e.CategoryId === id
      })
    },
    getCategoryTitle: state => (id) => {
      return state.categories.find(e => e.id === id).title
    },
    getToken: state => {
      return state.token
    },
    getTokenExpires: state => {
      return state.tokenExpiry
    }
  },
  mutations: {
    setToken (state, token) {
      if (token == null) {
        localStorage.removeItem('lxcb-token')
        localStorage.removeItem('lxcb-expires')
      } else {
        localStorage.setItem('lxcb-token', token)
      }
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setExpires (state, exp) {
      if (exp == null) {
        localStorage.removeItem('lxcb-expires')
      } else {
        localStorage.setItem('lxcb-expires', exp)
      }
      state.tokenExpiry = exp
    },
    setUser (state, user) {
      state.user = user
    },
    setEntries (state, payload) {
      state.entries = payload.slice()
    },
    setCategories (state, payload) {
      state.categories = payload.slice()
    },
    deleteCategory (state, payload) {
      state.categories = state.categories.filter((c) => c.id !== payload.id)
    },
    newCategory (state, payload) {
      state.categories.push(payload.category)
    },
    deleteListing (state, payload) {
      state.entries = state.entries.filter((e) => e.id !== payload.id)
    },
    newListing (state, payload) {
      state.entries.push(payload)
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setExpires ({commit}, exp) {
      commit('setExpires', exp)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setEntries ({commit}, payload) {
      commit('setEntries', payload)
    },
    fetchEntries ({commit}) {
      CodebaseService.getEntries().then(response => {
        commit('setEntries', response.data)
      })
    },
    fetchCategories ({commit}) {
      CodebaseService.getCategories().then(response => {
        commit('setCategories', response.data)
      })
    },
    newCategory ({commit, dispatch}, payload) {
      CodebaseService.postCategory(payload).then(response => {
        commit('newCategory', { category: response.data, res: response.data })
        dispatch('fetchCategories')
      })
    },
    deleteCategory ({commit}, payload) {
      CodebaseService.deleteCategory(payload.id).then(response => {
        commit('deleteCategory', payload)
        router.push('/')
      })
    },
    getCategory ({commit}, payload) {
      CodebaseService.getCategory(payload).then(response => {
        commit('newCategory')
      })
    },
    updateCategory ({commit, dispatch}, payload) {
      CodebaseService.updateCategory(payload).then(response => {
        dispatch('fetchCategories')
      })
    },
    deleteListing ({commit, dispatch, state}, payload) {
      CodebaseService.deleteListing(payload.id).then(response => {
        commit('deleteListing', payload)
        router.push('/browse/category/' + payload.CategoryId)
      })
    },
    saveListing ({commit, dispatch}, payload) {
      CodebaseService.updateListing(payload).then(response => {
        router.push('/browse/listing/' + payload.id)
        dispatch('fetchEntries')
      })
    },
    newListing ({commit, dispatch, state}, payload) {
      CodebaseService.postListing(payload).then(response => {
        commit('newListing', response.data)
        router.push('/browse/category/' + payload.CategoryId)
      })
    }
  }
})
