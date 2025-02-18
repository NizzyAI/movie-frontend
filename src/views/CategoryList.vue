<template>
  <div class="category-list-container">
    <div class="category-section">
      <h1 class="title">Categories</h1>
      <ul class="category-list">
        <li
          v-for="category in categories"
          :key="category.id"
          class="category-item"
          @click="fetchMoviesByCategory(category.id)"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>

    <div class="movie-section">
      <h2 v-if="movies.length > 0">Movies in {{ selectedCategoryName }}</h2>
      <ul class="movie-list">
        <li v-for="movie in movies" :key="movie.id" class="movie-item">
          <router-link :to="`/movies/${movie.id}`" class="movie-link">
            <div class="movie-poster-container">
              <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
            </div>
            <h3 class="movie-title">{{ movie.title }}</h3>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      categories: [],
      movies: [],
      selectedCategoryName: '',
    }
  },
  async created() {
    await this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:8000/api/categories')
        this.categories = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },

    async fetchMoviesByCategory(categoryId) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/categories/${categoryId}/movies`,
        )
        this.movies = response.data
        this.selectedCategoryName = this.categories.find(
          (category) => category.id === categoryId,
        )?.name
      } catch (error) {
        console.error('Error fetching movies by category:', error)
      }
    },
  },
}
</script>

<style scoped>
.category-list-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 100vh;
}

.category-section {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.title {
  font-size: 24px;
  color: #42b983;
  margin-bottom: 20px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 18px;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-item:hover {
  background-color: #42b983;
  color: white;
  transform: translateY(-5px);
}

.movie-section {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.movie-item {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.movie-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.movie-link {
  text-decoration: none;
  color: inherit;
  display: block;
  text-align: center;
}

.movie-poster-container {
  overflow: hidden;
  border-radius: 8px;
  height: 200px;
  display: flex;
  justify-content: center;
}

.movie-poster {
  width: auto;
  height: 100%;
  object-fit: cover;
}

.movie-title {
  font-size: 18px;
  margin-top: 10px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .category-list-container {
    flex-direction: column;
    height: auto;
  }

  .category-section,
  .movie-section {
    flex: none;
    width: 100%;
  }

  .category-item {
    font-size: 16px;
    padding: 12px;
  }

  .movie-title {
    font-size: 16px;
  }
}
</style>
