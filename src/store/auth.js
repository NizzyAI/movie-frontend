import axios from 'axios'

export default {
  namespaced: true,
  state: {
    auth: {
      token: localStorage.getItem('authToken') || null,
      user: JSON.parse(localStorage.getItem('user')) || null,
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.auth.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    SET_TOKEN(state, token) {
      state.auth.token = token
      localStorage.setItem('authToken', token)
    },
    LOGOUT(state) {
      state.auth.user = null
      state.auth.token = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/login', credentials)
        commit('SET_TOKEN', response.data.token)
        return response
      } catch (error) {
        console.error('Login error:', error)
        throw new Error('Failed to login')
      }
    },

    async logout({ commit }) {
      try {
        await axios.post('/api/logout')
        commit('LOGOUT')
      } catch (error) {
        console.error('Logout error:', error)
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.auth.token !== null && state.auth.user !== null
    },
    getUser(state) {
      return state.auth.user
    },
    getToken(state) {
      return state.auth.token
    },
  },
}
