<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <input type="email" v-model="email" placeholder="Email" class="input-field" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        class="input-field"
        required
      />
      <button type="submit" class="submit-btn">Login</button>
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
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f4f8;
  font-family: 'Poppins', sans-serif;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px; /* Reduced margin-bottom for closer spacing */
}

.login-form {
  background: #fff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.input-field {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #ffa500;
  outline: none;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #ffa500;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #e69500;
}

.submit-btn:focus {
  outline: none;
}

@media (max-width: 480px) {
  .login-form {
    width: 90%;
  }
}
</style>
