<template>
  <div class="movie-details-container">
    <div v-if="movie">
      <h1 class="movie-title">{{ movie.title }}</h1>

      <div class="movie-info">
        <p><strong>Category:</strong> {{ movie.category ? movie.category.name : 'N/A' }}</p>
        <p><strong>Director:</strong> {{ movie.director || 'N/A' }}</p>
        <p><strong>Release Date:</strong> {{ formattedReleaseDate }}</p>
        <p><strong>Synopsis:</strong> {{ movie.synopsis || 'No synopsis available.' }}</p>
      </div>

      <div v-if="movie.poster" class="movie-poster-container">
        <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
      </div>

      <h3>Reviews</h3>
      <div v-if="reviews.length">
        <div v-for="review in reviews" :key="review.id" class="review">
          <p>
            <strong>{{ review.user.name }}:</strong> {{ review.review }}
          </p>
        </div>
      </div>
      <div v-else>
        <p>No reviews yet.</p>
      </div>

      <SubmitReview v-if="isLoggedIn" :movieId="movie.id" />
    </div>
    <div v-else>
      <p>Loading movie details...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SubmitReview from '@/components/SubmitReview.vue'

export default {
  components: {
    SubmitReview,
  },
  data() {
    return {
      movie: {},
      reviews: [],
      isLoggedIn: false,
    }
  },
  computed: {
    formattedReleaseDate() {
      if (this.movie && this.movie.release_date) {
        return new Date(this.movie.release_date).toLocaleDateString()
      }
      return 'N/A'
    },
  },
  async created() {
    this.checkLoginStatus()
    await this.fetchMovieDetails()
    await this.fetchReviews()
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem('authToken')
      this.isLoggedIn = token ? true : false
    },

    async fetchMovieDetails() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/movies/${this.$route.params.id}`,
        )
        this.movie = response.data
      } catch (error) {
        console.error('Error fetching movie details:', error)
      }
    },

    async fetchReviews() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/movies/${this.$route.params.id}/reviews`,
        )
        this.reviews = response.data
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    },
  },
}
</script>

<style scoped>
.movie-details-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.movie-title {
  font-size: 30px;
  color: #42b983;
  margin-bottom: 20px;
}

.movie-info {
  font-size: 18px;
  margin-bottom: 20px;
}

.movie-info p {
  margin: 10px 0;
}

.movie-poster-container {
  margin-top: 20px;
  text-align: center;
}

.movie-poster {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 8px;
}

.review {
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

@media (max-width: 768px) {
  .movie-title {
    font-size: 24px;
  }

  .movie-info p {
    font-size: 16px;
  }
}
</style>
