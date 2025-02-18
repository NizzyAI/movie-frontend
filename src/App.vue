<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/HeaderS.vue'
import Footer from '@/components/FooterS.vue'
import UserDashboard from '@/views/UsersDashboard.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import LogoutButton from '@/components/LogoutButtonS.vue'

const isLoggedIn = ref(false)
const user = ref(null)

onMounted(() => {
  checkLoginStatus()
})

const checkLoginStatus = () => {
  const token = localStorage.getItem('authToken')
  const userData = JSON.parse(localStorage.getItem('user'))

  if (token && userData) {
    isLoggedIn.value = true
    user.value = userData
  } else {
    isLoggedIn.value = false
    user.value = null
  }
}
</script>

<template>
  <Header />
  <nav>
    <RouterLink to="/">Movies</RouterLink>
    <RouterLink to="/categories">Categories</RouterLink>
    <RouterLink to="/login">Log In</RouterLink>
    <RouterLink to="/register">Register</RouterLink>
    <LogoutButton v-if="isLoggedIn" />
  </nav>
  <main>
    <UserDashboard v-if="isLoggedIn && user?.role === 'user'" />
    <AdminDashboard v-else-if="isLoggedIn && user?.role === 'admin'" />
    <RouterView v-else />
  </main>
  <Footer />
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin: 20px 0;
}

nav a {
  display: inline-block;
  padding: 10px 15px;
  border-left: 1px solid #ccc;
  text-decoration: none;
  color: #333;
}

nav a:first-of-type {
  border-left: none;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #42b983;
}

main {
  padding: 20px;
}
</style>
