<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <select v-model="role">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: 'user', 
    };
  },
  methods: {
    async handleRegister() {
      try {
      
        const response = await axios.post('http://localhost:8000/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role, 
        });

      
        console.log('Registration successful:', response.data);

       
        const token = response.data.token;
        localStorage.setItem('authToken', token);

      
        localStorage.setItem('user', JSON.stringify(response.data.user));

    
        alert('Registration successful! You are now logged in.');

     
        this.$router.push('/');
      } catch (error) {
     
        console.error('Registration error:', error);

     
        if (error.response) {
        
          alert(`Registration failed: ${error.response.data.message || JSON.stringify(error.response.data.errors)}`);
        } else if (error.request) {
        
          alert('Registration failed: No response from the server. Please try again.');
        } else {
         
          alert('Registration failed: An unexpected error occurred. Please try again.');
        }
      }
    }
  }
};
</script>

<style scoped>
input, select {
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