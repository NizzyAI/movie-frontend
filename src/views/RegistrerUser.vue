<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister" class="register-form">
      <input type="text" v-model="name" placeholder="Name" class="input-field" required />
      <input type="email" v-model="email" placeholder="Email" class="input-field" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        class="input-field"
        required
      />
      <select v-model="role" class="input-field" required>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" class="submit-btn">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: 'user',
    }
  },
  methods: {
    async handleRegister() {
      try {
        const response = await axios.post('http://localhost:8000/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role,
        })

        console.log('Registration successful:', response.data)

        const token = response.data.token
        localStorage.setItem('authToken', token)

        localStorage.setItem('user', JSON.stringify(response.data.user))

        alert('Registration successful! You are now logged in.')

        this.$router.push('/')
      } catch (error) {
        console.error('Registration error:', error)

        if (error.response) {
          alert(
            `Registration failed: ${error.response.data.message || JSON.stringify(error.response.data.errors)}`,
          )
        } else if (error.request) {
          alert('Registration failed: No response from the server. Please try again.')
        } else {
          alert('Registration failed: An unexpected error occurred. Please try again.')
        }
      }
    },
  },
}
</script>

<style scoped>
.register-container,
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
  margin-bottom: 20px;
}

.register-form,
.login-form {
  background: #fff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.input-field,
select {
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

.input-field:focus,
select:focus {
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
  .register-form,
  .login-form {
    width: 90%;
  }
}
</style>
