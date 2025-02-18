<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password,
        })

        console.log('Login successful:', response.data)

        this.$store.commit('auth/SET_TOKEN', response.data.token)
        this.$store.commit('auth/SET_USER', response.data.user)

        if (response.data.user.role === 'admin') {
          alert('Login successful! Redirecting to the admin dashboard...')
          this.$router.push('/admin-dashboard')
        } else {
          alert('Login successful! Redirecting to the user dashboard...')
          this.$router.push('/user-dashboard')
        }
      } catch (error) {
        console.error('Login error:', error)

        if (error.response) {
          alert(`Login failed: ${error.response.data.message || 'Invalid credentials'}`)
        } else if (error.request) {
          alert('Login failed: No response from the server. Please try again.')
        } else {
          alert('Login failed: An unexpected error occurred. Please try again.')
        }
      }
    },
  },
}
</script>

<style scoped>
input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  max-width: 300px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #369f6e;
}
</style>
