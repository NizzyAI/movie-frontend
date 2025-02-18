<template>
  <div class="movie-list-container">
    <h1 class="title">Movies</h1>
    <ul class="movie-list">
      <li v-for="movie in movies" :key="movie.id" class="movie-card">
        <router-link :to="`/movies/${movie.id}`" class="movie-link">
          <div class="movie-poster-container">
            <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
          </div>
          <h2 class="movie-title">{{ movie.title }}</h2>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      movies: [],
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8000/api/movies')
      this.movies = response.data
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  },
}
</script>

<style scoped>
.movie-list-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  color: #42b983;
  margin-bottom: 20px;
}

.movie-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.movie-card {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 350px;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.movie-link {
  text-decoration: none;
  color: inherit;
  display: block;
  text-align: center;
  flex-grow: 1;
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
  .movie-list-container {
    padding: 15px;
  }

  .movie-title {
    font-size: 16px;
  }
}
</style>
