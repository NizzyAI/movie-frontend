<template>
  <button @click="handleLogout">Log Out</button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

const router = useRouter()
const store = useStore()

const handleLogout = async () => {
  try {
    await axios.post('http://localhost:8000/api/logout')

    await store.dispatch('auth/logout')

    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
    alert('Failed to log out. Please try again.')
  }
}
</script>

<style scoped>
button {
  padding: 10px 15px;
  background-color: #ff4444;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

button:hover {
  background-color: #cc0000;
}
</style>
