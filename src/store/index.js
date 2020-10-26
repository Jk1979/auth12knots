import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import booking from './booking'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    errors: []
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    addError(state, error) {
      state.errors.push(error);
    },
    clearError(state) {
      state.error = null
    },
    clearErrors(state) {
      state.errors = []
    }
  },
  getters: {
    error: state => state.error,
    errors: state => state.errors
  },
  modules: {
    auth, info, category, booking
  }
})
