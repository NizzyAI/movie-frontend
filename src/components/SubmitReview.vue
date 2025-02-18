<template>
  <div>
    <h2>Submit a Review</h2>
    <form @submit.prevent="submitReview">
      <textarea v-model="review" placeholder="Write your review here" required></textarea>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    movieId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      review: '',
    }
  },
  methods: {
    async submitReview() {
      try {
        const token = localStorage.getItem('authToken')

        if (!token) {
          alert('You must be logged in to submit a review.')
          return
        }

        const response = await axios.post(
          'http://localhost:8000/api/reviews',
          {
            movie_id: this.movieId,
            review: this.review,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        console.log('Review submitted successfully:', response.data)
        this.review = ''
        alert('Review submitted successfully!')
      } catch (error) {
        console.error('Error submitting review:', error)
        alert('Failed to submit review. Please try again.')
      }
    },
  },
}
</script>

<style scoped>
textarea {
  display: block;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #ffa500;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #ffa500;
}
</style>
