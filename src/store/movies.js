import axios from 'axios';

export default {
  namespaced: true,
  state: {
    movies: []
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    }
  },
  actions: {
    async fetchMovies({ commit }) {
      try {
        const response = await axios.get('/movies');
        commit('SET_MOVIES', response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  }
};
