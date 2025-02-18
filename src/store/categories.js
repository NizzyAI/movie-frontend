import axios from 'axios';

export default {
  namespaced: true,
  state: {
    categories: []
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const response = await axios.get('/categories');
        commit('SET_CATEGORIES', response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  }
};
