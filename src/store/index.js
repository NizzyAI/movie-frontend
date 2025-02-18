import { createStore } from 'vuex';
import auth from './auth';
import movies from './movies';
import categories from './categories';

export default createStore({
  modules: {
    auth,
    movies,
    categories
  }
});
